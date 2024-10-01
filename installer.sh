#!/bin/bash

# Função para mostrar animação de loading com mensagem
loading() {
    local pid=$1
    local message=$2
    local delay=0.1
    local spin='/-\|'
    local i=0

    while kill -0 $pid 2>/dev/null; do
        echo -ne "\r[${spin:i++ % 4}] $message"
        sleep $delay
    done
    echo -ne "\r   \r" # Limpa a linha
}

# Remove o diretório antigo @imperazim
rm -rf @imperazim &
loading $! "Removendo @imperazim"

# Clona o repositório com a branch main de forma silenciosa
git clone -b main https://github.com/ImperaZim/EasyNTSUtils.git > /dev/null 2>&1 &
loading $! "Baixando Dados"

# Cria o diretório @imperazim e move os arquivos para lá
mkdir -p @imperazim
mv EasyNTSUtils/src/* @imperazim/
mv EasyNTSUtils/tsconfig.json ./tsconfig.json

# Remove o diretório EasyNTSUtils
rm -rf EasyNTSUtils &

# Instala pacotes necessários de forma silenciosa
npm i colorette fs --silent &
loading $! "Instalando Pacotes"

# Remove o arquivo installer.sh se existir
rm -rf ./installer.sh

# Mensagem de sucesso
echo -e "\nEasyNTSUtils Instalado!"
