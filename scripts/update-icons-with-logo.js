import sharp from 'sharp';
import path from 'path';

const logoPath = path.resolve('public/assets/aistudio/FB_IMG_1766551913118_deea7bea.jpg');

async function generateAppIcons() {
  console.log('Generating PWA icons from official B & M Crochet House logo...');

  // 192x192
  await sharp(logoPath)
    .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile('public/pwa-192x192.png');
  console.log('Created public/pwa-192x192.png');

  // 512x512
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile('public/pwa-512x512.png');
  console.log('Created public/pwa-512x512.png');

  // Apple Touch Icon (180x180)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile('public/apple-touch-icon.png');
  console.log('Created public/apple-touch-icon.png');

  // Favicon (32x32)
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile('public/favicon.ico');
  console.log('Created public/favicon.ico');

  // Maskable 512x512 with safe zone padding (15% padding around the circular logo)
  const innerLogo = await sharp(logoPath)
    .resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: innerLogo, gravity: 'center' }])
    .png()
    .toFile('public/pwa-maskable-512x512.png');
  console.log('Created public/pwa-maskable-512x512.png');

  console.log('All PWA app icons successfully generated from official logo!');
}

generateAppIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
