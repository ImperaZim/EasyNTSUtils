
rm -rf @imperazim

git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git

mkdir -p @imperazim
mv EasyNTSUtils/src/* @imperazim/

rm -rf EasyNTSUtijs

npm i colorette fs --silent

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
  console.log('Arquivo tsconfig.json atualizado!');
}else{
  console.log('Arquivo tsconfig.json não encontrado!');
}
EOF

node updateTsConfig.js
rm updateTsConfig.js

rm -rf ./installer.sh 

echo 'EasyNTSUtils Instalado!';