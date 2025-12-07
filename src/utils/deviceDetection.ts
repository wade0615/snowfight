/**
 * 裝置偵測工具
 * 使用 User Agent 判斷裝置類型
 */

/**
 * 判斷是否為行動裝置（手機或平板）
 * @returns true 為行動裝置，false 為桌面裝置
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // 偵測 Android 裝置
  if (/android/i.test(userAgent)) {
    return true;
  }

  // 偵測 iOS 裝置 (iPhone, iPad, iPod)
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return true;
  }

  // 偵測 Windows Phone
  if (/windows phone/i.test(userAgent)) {
    return true;
  }

  // 偵測其他行動裝置關鍵字
  if (/mobile|tablet|kindle|silk|playbook|bb\d+|meego/i.test(userAgent)) {
    return true;
  }

  return false;
}

/**
 * 判斷是否為平板裝置
 * @returns true 為平板，false 為其他裝置
 */
export function isTabletDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const userAgent = navigator.userAgent || navigator.vendor;

  // iPad
  if (/iPad/.test(userAgent)) {
    return true;
  }

  // Android 平板（通常沒有 "mobile" 關鍵字）
  if (/android/i.test(userAgent) && !/mobile/i.test(userAgent)) {
    return true;
  }

  // 其他平板
  if (/tablet|kindle|playbook|silk/i.test(userAgent)) {
    return true;
  }

  return false;
}

/**
 * 獲取裝置類型
 * @returns 'mobile' | 'tablet' | 'desktop'
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (isTabletDevice()) {
    return 'tablet';
  }
  if (isMobileDevice()) {
    return 'mobile';
  }
  return 'desktop';
}
