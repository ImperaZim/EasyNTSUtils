#!/bin/bash

# Remove o diretório antigo @imperazim
rm -rf @imperazim &

# Clona o repositório com a branch main de forma silenciosa
git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git > /dev/null 2>&1 &
echo "Baixando Dados"

# Cria o diretório @imperazim e move os arquivos para lá
mkdir -p @imperazim
mv EasyNTSUtils/src/* @imperazim/
mv EasyNTSUtils/tsconfig.json ./tsconfig.json
echo "Compilando Dados"

# Remove o diretório EasyNTSUtils
rm -rf EasyNTSUtils &
echo "Removendo vestigios"

# Instala pacotes necessários de forma silenciosa
npm i colorette fs --silent &
echo "Instalando Pacotes"

# Remove o arquivo installer.sh se existir
rm -rf ./installer.sh

# Mensagem de sucesso
echo -e "\nEasyNTSUtils Instalado!"
