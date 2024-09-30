# Cria o diretório ENTSU
mkdir -p ./ENTSU/

# Navega até o diretório ENTSU
cd ./ENTSU/

# Remove os diretórios e arquivos antigos
rm -rf EmbedUtils/ JsonUtils/ ConsoleUtils/ MySQLUtils/ index.ts

# Clona o repositório EasyNTSUtils
git clone 'https://github.com/ImperaZim/EasyNTSUtils.git'

# Navega até o diretório do repositório clonado
cd EasyNTSUtils

# Move todos os arquivos do repositório clonado para ENTSU
mv ./src/* ../

# Volta para o diretório ENTSU
cd ../

# Remove o diretório EasyNTSUtils
rm -rf EasyNTSUtils

# Volta para o diretório inicial
cd ../


if [ -f tsconfig.json ]; then 
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

node updateTsConfig.js

rm updateTsConfig.js 
fi;

npm i colorette

rm -rf ./installer.sh 

echo 'EasyNTSUtils Instalado!';