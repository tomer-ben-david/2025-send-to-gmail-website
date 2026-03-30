import aiHubReleaseInfo from '../../update-info-aihub.json';
import quikeyReleaseInfo from '../../update-info.json';
import sendToGmailReleaseInfo from '../../update-info-send.json';
import xyzConvertReleaseInfo from '../../update-info-xyzconvert.json';

type AppBaseName = 'AIHub' | 'QuiKey' | 'SendToGmailDrive' | 'XYZConvert';

type ReleaseInfo = {
  version: string;
  downloadURL: string;
};

const releaseInfoByApp: Record<AppBaseName, ReleaseInfo> = {
  AIHub: aiHubReleaseInfo,
  QuiKey: quikeyReleaseInfo,
  SendToGmailDrive: sendToGmailReleaseInfo,
  XYZConvert: xyzConvertReleaseInfo,
};

export function currentReleaseVersion(appBaseName: AppBaseName): string {
  return releaseInfoByApp[appBaseName].version;
}

export function dmgDownloadUrl(appBaseName: AppBaseName): string {
  return releaseInfoByApp[appBaseName].downloadURL;
}
