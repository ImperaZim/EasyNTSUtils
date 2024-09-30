rm rf ./ENTSU/
mkdir -p ./ENTSU/

cd ./ENTSU/

rm -rf EmbedUtils/ JsonUtils/ ConsoleUtils/ MySQLUtils/ index.ts

git clone 'https://github.com/ImperaZim/EasyNTSUtils.git' 
mv ./EasyNTSUtils/src/* ../

cd ..
rm -rf EasyNTSUtils

ls

cat << 'EOF' > updateTsConfig.js
const fs = require('fs');

const filePath = './tsconfig.json';

if (fs.existsSync(filePath)) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Adiciona baseUrl
  data.compilerOptions = {
    ...data.compilerOptions,
    "baseUrl": "./src/",
    "paths": {
      "Utils": ["./"],
      "Console": ["./ConsoleUtils"],
      "Json": ["./JsonUtils"],
      "MySQL": ["./MySQLUtils"],
      "DiscordElementor/*": ["DiscordElementor/*"],
      "DiscordElementor": ["DiscordElementor"],
      "DiscordElementCollector/*": ["DiscordElementor/collector/*"],
      "DiscordElementCollector": ["DiscordElementor/collector"],
      "DiscordRow/*": ["DiscordElementor/row/*"],
      "DiscordRow": ["DiscordElementor/row"],
      "DiscordRowEmbed": ["DiscordElementor/row/embed"],
      "DiscordRowButton": ["DiscordElementor/row/component/button"],
      "DiscordRowSelect": ["DiscordElementor/row/component/select"],
      "DiscordModal/*": ["DiscordElementor/modal/*"],
      "DiscordModal": ["DiscordElementor/modal"],
      "DiscordModalInput": ["DiscordElementor/modal/component/input"],
      "DiscordModalComponent": ["DiscordElementor/modal/component"]
    }
  };
}
EOF



echo 'EasyNTSUtils Instalado!';