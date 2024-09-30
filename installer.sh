mkdir -p ./ENTSU/

cd ./ENTSU/

rm -rf EmbedUtils/ JsonUtils/ ConsoleUtils/ MySQLUtils/ index.ts

git clone 'https://github.com/ImperaZim/EasyNTSUtils.git' 
cd EasyNTSUtils
mv ./src/* ../

ls

cd ../ 
rm -rf EasyNTSUtils

ls



echo 'EasyNTSUtils Instalado!';