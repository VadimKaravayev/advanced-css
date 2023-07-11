1. npm init -y
2. npm install -D tailwindcss
3. npx tailwindcss init
4. in tailwind.config.js specify a path which tailwind should look for your code (html, js etc.)
   content: ['./*.html']
5. Create input.css with tailwind layers

@tailwind base;
@tailwind components;
@tailwind utilities;

5. In package.json create a script that will compile your code and watch your changes

   "watch": "tailwindcss -i ./input.css -o ./css/main.css --watch"

6. Create index.html and specify a path to a compile css file (css/main.css)
