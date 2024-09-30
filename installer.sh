# Remove o diretório antigo @imperazim
rm -rf @imperazim

# Clona o repositório com a branch main
git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git

# Cria o diretório @imperazim e move os arquivos para lá
mkdir -p @imperazim
mv EasyNTSUtils/src/* @imperazim/

# Remove o diretório EasyNTSUtils
rm -rf EasyNTSUtils

# Instala pacotes necessários
npm i colorette fs --silent

# Cria e executa o script para atualizar o tsconfig.json
cat << 'EOF' > updateTsConfig.js
const fs = require('fs');
const filePath = './tsconfig.json';

if (fs.existsSync(filePath)) {
  // Lê o arquivo tsconfig.json
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Atualiza o tsconfig.json com as novas opções
  data.compilerOptions = {
    ...data.compilerOptions,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "strict": true,
    "allowSyntheticDefaultImports": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "baseUrl": "./",
    "paths": {
      "Utils": ["./@imperazim/"],
      "Console": ["./@imperazim/ConsoleUtils"],
      "Json": ["./@imperazim/JsonUtils"],
      "MySQL": ["./@imperazim/MySQLUtils"],
      "DiscordElementor/*": ["./@imperazim/DiscordElementor/*"],
      "DiscordElementor": ["./@imperazim/DiscordElementor"],
      "DiscordElementCollector/*": ["./@imperazim/DiscordElementor/collector/*"],
      "DiscordElementCollector": ["./@imperazim/DiscordElementor/collector"],
      "DiscordRow/*": ["./@imperazim/DiscordElementor/row/*"],
      "DiscordRow": ["./@imperazim/DiscordElementor/row"],
      "DiscordRowEmbed": ["./@imperazim/DiscordElementor/row/embed"],
      "DiscordRowButton": ["./@imperazim/DiscordElementor/row/component/button"],
      "DiscordRowSelect": ["./@imperazim/DiscordElementor/row/component/select"],
      "DiscordModal/*": ["./@imperazim/DiscordElementor/modal/*"],
      "DiscordModal": ["./@imperazim/DiscordElementor/modal"],
      "DiscordModalInput": ["./@imperazim/DiscordElementor/modal/component/input"],
      "DiscordModalComponent": ["./@imperazim/DiscordElementor/modal/component"]
    }
  };

  // Salva o arquivo atualizado com formatação
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Arquivo tsconfig.json atualizado!');
} else {
  console.log('Arquivo tsconfig.json não encontrado!');
}
EOF

# Executa o script de atualização
node updateTsConfig.js

# Remove o script de atualização
rm updateTsConfig.js

# Remove o arquivo installer.sh se existir
rm -rf ./installer.sh

# Mensagem de sucesso
echo 'EasyNTSUtils Instalado!';
