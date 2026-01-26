import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = '打雪仗 Snowball Fight - 雪球大戰網頁遊戲';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1a2e',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 背景網格 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(250,245,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(250,245,235,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            display: 'flex',
          }}
        />

        {/* 主卡片 */}
        <div
          style={{
            background: '#FAF5EB',
            border: '6px solid #1a1a2e',
            boxShadow: '8px 8px 0px 0px rgba(0,0,0,0.4)',
            padding: '60px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            position: 'relative',
          }}
        >
          {/* 角標裝飾 */}
          <div style={{ position: 'absolute', top: -8, left: -8, width: 20, height: 20, background: '#E04040', display: 'flex' }} />
          <div style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, background: '#3E7DC9', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: -8, left: -8, width: 20, height: 20, background: '#3E7DC9', display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: -8, right: -8, width: 20, height: 20, background: '#E04040', display: 'flex' }} />

          {/* 標題 */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#1a1a2e',
              letterSpacing: '4px',
              display: 'flex',
            }}
          >
            打雪仗
          </div>

          {/* 副標題 */}
          <div
            style={{
              fontSize: '28px',
              color: '#3E7DC9',
              letterSpacing: '6px',
              display: 'flex',
            }}
          >
            SNOWBALL FIGHT
          </div>

          {/* 分隔線 */}
          <div
            style={{
              width: '300px',
              height: '4px',
              background: '#C8B8A0',
              display: 'flex',
            }}
          />

          {/* 描述 */}
          <div
            style={{
              fontSize: '22px',
              color: '#666',
              display: 'flex',
            }}
          >
            免費線上雪球大戰網頁遊戲
          </div>
        </div>

        {/* 雪球裝飾 */}
        <div style={{ position: 'absolute', top: 80, left: 120, width: 24, height: 24, background: '#FAFAFA', border: '3px solid #D0D0D0', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 200, right: 100, width: 18, height: 18, background: '#FAFAFA', border: '3px solid #D0D0D0', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 120, left: 200, width: 20, height: 20, background: '#FAFAFA', border: '3px solid #D0D0D0', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 80, right: 180, width: 16, height: 16, background: '#FAFAFA', border: '3px solid #D0D0D0', display: 'flex' }} />

        {/* 玩家色塊 */}
        <div style={{ position: 'absolute', bottom: 160, right: 280, width: 30, height: 30, background: '#E04040', border: '3px solid #8B0000', display: 'flex' }} />
        {/* 敵人色塊 */}
        <div style={{ position: 'absolute', top: 160, left: 280, width: 30, height: 30, background: '#30A14E', border: '3px solid #1B5E20', display: 'flex' }} />
      </div>
    ),
    { ...size },
  );
}
