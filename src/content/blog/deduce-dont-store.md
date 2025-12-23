---
title: "Deduce, Don't Store"
description: "Why we prefer computing state from the source of truth rather than caching values that can become stale."
pubDate: 2025-12-23
author: "QuiKey Team"
tags: ["Swift", "Engineering", "Architecture", "State Management"]
---

One of the most common sources of bugs in complex applications is stale state. When you store a value that depends on another piece of data, you create a requirement to keep those two values in sync. If you miss a single update path, your application enters an invalid state that can be incredibly difficult to debug.

At [QuiKey](https://quikey.app), we follow a strict engineering principle to solve this problem: Deduce state from the source of truth rather than storing it.

## The Danger of Cached Values

In traditional desktop development, it is tempting to store boolean flags like `isUserSignedIn` or `hasSelectedFiles` as mutable properties. However, these flags are rarely the actual source of truth. The true state lives in your authentication token or the current selection in the file system.

By storing these flags separately, you are essentially caching a view of the reality. If the auth token expires or the user deletes a file, your stored flag becomes a lie. This leads to edge cases where the UI shows one thing while the underlying system is doing another.

## Using Computed Properties as the Source of Truth

In Swift, we leverage computed properties and dedicated state managers to ensure that the application always reflects the current reality. Instead of updating a status variable whenever an action occurs, we query the state directly from the service that owns the data.

This approach ensures that there is only one place where an update can happen. Every other component simply observes or deduces its logic from that single point.

```swift
/// An example of deducing state from a dependency
final class DocumentStore {
    private let fileSystem: FileSystemProvider
    
    /// The true source of truth is the actual file count on disk
    var hasWorkToProcess: Bool {
        // We compute this every time it is needed
        return fileSystem.pendingFileCount > 0
    }
    
    init(fileSystem: FileSystemProvider) {
        self.fileSystem = fileSystem
    }
}
```

By making `hasWorkToProcess` a computed property, we eliminate the possibility of it ever being out of sync with the `fileSystem`. There is no `setHasWorkToProcess(true)` method to call, which removes an entire category of logic errors.

## Isolating Side Effects in the Deduction Loop

Deducing state is not just about simple booleans. It is a philosophy that extends to complex UI transitions and background operations. When you need to decide whether to show a specific window or enable a button, you should deduce that decision from the current environment variables.

In the QuiKey core, we inject services that provide these environmental snapshots. For example, if we need to know if a feature is available, we don't check a stored `isFeatureEnabled` flag. Instead, we query a `TierManager` that evaluates the current subscription and feature flags in real time. This ensures that the app reacts immediately to changes without needing complex synchronization code.

## Benefits of Reduced Complexity

When you stop storing redundant state, your code becomes significantly more predictable. Your view models become simpler because they no longer need to manage the lifecycle of cached values. Your tests also become more robust because you only need to mock the primary source of truth to verify hundreds of different deduced outcomes.

This principle of deducing reality is a core part of how we maintain the stability of [QuiKey](https://quikey.app). By removing the opportunity for state to become stale, we create a faster and more reliable experience for our users.

If you are interested in a macOS tool built with this level of engineering rigor, [you can try QuiKey today](https://quikey.app).
