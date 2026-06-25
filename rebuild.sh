#!/usr/bin/env bash
# Rebuild strony z tresci WordPressa i deploy na cyber-folks (FTP).
# Haslo FTP czytane z ~/projekty/wolontariat-deploy.md (poza repo).
set -e
cd "$(dirname "$0")"
PASS=$(grep '^FTP pass:' ~/projekty/wolontariat-deploy.md | sed 's/^FTP pass: //')
echo "==> build z WordPressa..."
CONTENT_SOURCE=wp WP_GRAPHQL_URL=http://wolontariat.org.pl/cms/graphql npm run build
echo "==> deploy FTP na cyber-folks..."
lftp -u "admin@wolontariat.org.pl,$PASS" s32.cyber-folks.pl -e "set ssl:verify-certificate no; set net:timeout 30; set mirror:parallel-transfer-count 5; mirror -R --only-newer --exclude-glob .DS_Store out public_html; bye"
echo "==> gotowe: http://wolontariat.org.pl"
