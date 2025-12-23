---
title: "Deduce, Don't Store"
description: "Why we prefer computing state from the source of truth rather than caching values that can become stale."
pubDate: 2025-12-23
author: "QuiKey Team"
tags: ["Engineering", "Architecture", "State Management", "Swift"]
---

One of the most common sources of bugs in complex applications is stale state. When you store a value that depends on another piece of data, you create a requirement to keep those two values in sync. If you miss a single update path, your application enters an invalid state that can be incredibly difficult to debug.

At [QuiKey](https://quikey.app), we are strict about state management: Deduce state from the source of truth rather than storing it. While we implement this using Swift computed properties, it is important to note that this is not a language specific trick. It is a fundamental engineering practice used in reliable systems across all platforms to eliminate data synchronization errors.

## The Danger of Cached Values

In traditional application development, it is tempting to store boolean flags like `isLoaded` or `isAuthorized` as mutable properties. However, these flags are rarely the actual source of truth. The true state lives in your data collection or your active session token.

By storing these flags separately, you are essentially caching a view of the reality. If the data is cleared or the token expires, your stored flag becomes a lie. This leads to edge cases where the UI shows one thing while the underlying system is doing another.

## Computing State from the Source of Truth

To ensure that the application always reflects the current reality, we prefer to compute state directly from the service that owns the data. Instead of updating a status variable whenever an action occurs, we query the state in real time.

This approach ensures that there is only one place where an update can happen. Every other component simply observes or deduces its logic from that single point.

```swift
/// A generic example of deducing state from a dependency
final class InventoryManager {
    private let storage: StorageProvider
    
    /// The true source of truth is the actual data in storage
    var needsReplenishment: Bool {
        // We compute this every time it is needed
        return storage.itemCount < threshold
    }
    
    private let threshold = 10
    
    init(storage: StorageProvider) {
        self.storage = storage
    }
}
```

By making `needsReplenishment` a computed property, we eliminate the possibility of it ever being out of sync with the `storage`. There is no `setNeedsReplenishment(true)` method to call, which removes an entire category of logic errors.

## Isolating Side Effects in the Deduction Loop

Deducing state is not just about simple booleans. It is a philosophy that extends to complex UI transitions and background operations. When you need to decide whether to show a specific view or enable an action, you should deduce that decision from the current environment variables.

In our core architecture, we use services that provide these environmental snapshots. For example, if we need to know if a permission is granted, we do not check a stored `isPermitted` flag. Instead, we query a provider that evaluates the current system settings in real time. This ensures that the app reacts immediately to changes without needing complex synchronization code.

## Benefits of Reduced Complexity

When you stop storing redundant state, your code becomes significantly more predictable. Your models become simpler because they no longer need to manage the lifecycle of cached values. Your tests also become more robust because you only need to mock the primary source of truth to verify hundreds of different deduced outcomes.

This principle of deducing reality is a core part of how we maintain engineering rigor at [QuiKey](https://quikey.app). By removing the opportunity for state to become stale, we create a faster and more reliable experience for our users.

If you are interested in a macOS tool built with this level of engineering focus, [you can try QuiKey today](https://quikey.app).
