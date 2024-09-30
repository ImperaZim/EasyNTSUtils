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
    "baseUrl": "./@imperazim/",
    "paths": {
      "Utils": ["./"],
      "Console": ["./ConsoleUtils"],
      "Json": ["./JsonUtils"],
      "MySQL": ["./MySQLUtils"],
      "DiscordElementor/*": ["./DiscordElementor/*"],
      "DiscordElementor": ["./DiscordElementor"],
      "DiscordElementCollector/*": ["./DiscordElementor/collector/*"],
      "DiscordElementCollector": ["./DiscordElementor/collector"],
      "DiscordRow/*": ["./DiscordElementor/row/*"],
      "DiscordRow": ["./DiscordElementor/row"],
      "DiscordRowEmbed": ["./DiscordElementor/row/embed"],
      "DiscordRowButton": ["./DiscordElementor/row/component/button"],
      "DiscordRowSelect": ["./DiscordElementor/row/component/select"],
      "DiscordModal/*": ["./DiscordElementor/modal/*"],
      "DiscordModal": ["./DiscordElementor/modal"],
      "DiscordModalInput": ["./DiscordElementor/modal/component/input"],
      "DiscordModalComponent": ["./DiscordElementor/modal/component"]
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
