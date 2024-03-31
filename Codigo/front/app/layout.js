import { fonts } from './fonts'
import { Providers } from './providers'

function RootLayout({ children }) {
  return (
    <html lang='en' className={fonts.rubik.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

module.exports = RootLayout;