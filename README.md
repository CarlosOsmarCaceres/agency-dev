# Guia paso a paso del proyecto agency-dev

## Paso 1 - Crear proyecto, instalaciones, configuraciones y estructura de carpetas

 . npm init -y              # Inicia el proyecto sin preguntar nombre
 . npm i -D type script     # Inicializa ts --
 . tsc --init               # Crea en la raiz config basica de tsconfig.json
 . tsc -p .                  # Para transpilar ts y crear la carpeta dist, ejemplo en domiain, backend frontend y raiz

# Cada carpeta debe tener su inde.ts
 . Ejemplo en domain 
                entities --- index.ts
                services --- index.ts
                use-cases --- index.ts



## Para investigar
* averiguar para hacer que mi dominio sea una depéndencia
![alt text](image.png)