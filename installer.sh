mkdir -p ./ENTSU/

cd ./ENTSU/

rm -rf EmbedUtils/ JsonUtils/ ConsoleUtils/ MySQLUtils/ index.ts

git clone 'https://github.com/ImperaZim/EasyNTSUtils.git' 
cd EasyNTSUtils
mv ./src/* ../

cd ../ 

ls 

rm -rf EasyNTSUtils
cd ../../

echo 'EasyNTSUtils Instalado!';