// Base de datos de preguntas y retos de sintaxis Python - Didáctico y claro para secundaria

const CHALLENGES_DATABASE = {
    // === NIVEL 1: Algoritmos y Google Colab ===
    "terminal_1_1": {
        id: "terminal_1_1",
        category: "ALGORITMOS",
        title: "🧠 ¿Qué es un Algoritmo?",
        description: "¿Cuál es la mejor definición de un <b>algoritmo</b>?",
        type: "multiple_choice",
        options: [
            { id: "a", text: "🔧 Una pieza física de la computadora." },
            { id: "b", text: "📋 Una serie de pasos ordenados para resolver un problema.", correct: true },
            { id: "c", text: "🎮 Un videojuego 3D." }
        ],
        hint: "Es como una receta de cocina: pasos ordenados del 1 al final.",
        explanation: "¡Correcto! Son pasos lógicos y ordenados para cumplir una meta."
    },

    "terminal_1_2": {
        id: "terminal_1_2",
        category: "GOOGLE COLAB",
        title: "☁️ ¿Qué es Google Colab?",
        description: "¿Para qué usamos <b>Google Colab</b> en clase?",
        type: "multiple_choice",
        options: [
            { id: "a", text: "🐍 Programar en Python directo desde el navegador (en la nube).", correct: true },
            { id: "b", text: "🎬 Editar videos y películas." },
            { id: "c", text: "🎨 Dibujar imágenes con pinceles." }
        ],
        hint: "Permite usar Python en internet sin necesidad de instalar programas.",
        explanation: "¡Excelente! Funciona en la nube y guarda tus cuadernos en Drive."
    },

    "door_1": {
        id: "door_1",
        category: "PASOS LÓGICOS",
        title: "🚪 Puerta 1: Rutina de Mañana",
        description: "Ordena los pasos lógicos para <b>hacerte un té/café</b>:",
        type: "order_steps",
        steps: [
            { id: "s1", text: "1. Calentar agua", correctIndex: 0 },
            { id: "s2", text: "2. Servir agua en la taza con el saquito", correctIndex: 1 },
            { id: "s3", text: "3. Endulzar y revolver", correctIndex: 2 },
            { id: "s4", text: "4. ¡Tomar la bebida!", correctIndex: 3 }
        ],
        hint: "Primero calientas el agua, luego sirves, endulzas y finalmente tomas.",
        explanation: "¡Genial! Los algoritmos siempre siguen un orden secuencial lógico."
    },

    // === NIVEL 2: Sintaxis de Variables y Print ===
    "terminal_2_1": {
        id: "terminal_2_1",
        category: "SINTAXIS PRINT",
        title: "🐛 Cierra las comillas",
        description: "Falta una comilla al final del mensaje. ¡Corrígela!",
        type: "code_fix",
        initialCode: 'print("Hola Mundo)',
        validationRegex: /^print\s*\(\s*(["'])Hola Mundo\1\s*\)\s*$/i,
        hint: "Toda cadena abierta con comillas debe cerrarse antes del paréntesis final.",
        explanation: "¡Muy bien! Los textos en Python siempre van entre comillas."
    },

    "terminal_2_2": {
        id: "terminal_2_2",
        category: "VARIABLES",
        title: "📦 ¿Qué tipo de dato es?",
        description: "En <code>edad = 15</code>, ¿qué tipo de dato guarda la variable?",
        type: "multiple_choice",
        options: [
            { id: "a", text: "🔤 str (Texto)" },
            { id: "b", text: "🔢 int (Número entero)", correct: true },
            { id: "c", text: "✅ bool (Booleano)" }
        ],
        hint: "Es un número sin coma y no tiene comillas.",
        explanation: "¡Exacto! Los números enteros en Python son de tipo 'int'."
    },

    "door_2": {
        id: "door_2",
        category: "SINTAXIS INPUT",
        title: "🚪 Puerta 2: Función Input",
        description: "Para pedir datos al usuario se usa <code>input()</code>. Corrige el nombre de la función que está mal escrito:",
        type: "code_fix",
        initialCode: 'nombre = inout("Tu nombre: ")',
        validationRegex: /^nombre\s*=\s*input\s*\(\s*["']Tu nombre:\s*["']\s*\)$/i,
        hint: "El nombre correcto de la función para ingresar datos en Python es 'input'.",
        explanation: "¡Perfecto! 'input()' permite que el usuario ingrese datos por teclado."
    },

    // === NIVEL 3: Condicionales If / Else ===
    "terminal_3_1": {
        id: "terminal_3_1",
        category: "SINTAXIS IF",
        title: "⚖️ Los dos puntos del IF",
        description: "Agrega los <b>dos puntos <code>:</code></b> que faltan al final de la línea del <code>if</code>:",
        type: "code_fix",
        initialCode: 'if puntos > 10\n    print("Ganaste")',
        validationRegex: /^if\s+puntos\s*>\s*10\s*:\s*\n\s*print\s*\(\s*["']Ganaste["']\s*\)\s*$/i,
        hint: "En Python, al final de cada 'if' siempre van dos puntos ':'.",
        explanation: "¡Excelente! Los dos puntos ':' son obligatorios para abrir el bloque."
    },

    "terminal_3_2": {
        id: "terminal_3_2",
        category: "SINTAXIS ELSE",
        title: "🔄 Estructura Else",
        description: "El bloque <code>else</code> no lleva condición y necesita dos puntos. Corrígelo para que quede <code>else:</code>",
        type: "code_fix",
        initialCode: 'else puntos < 10\n    print("Intenta de nuevo")',
        validationRegex: /^else\s*:\s*\n\s*print\s*\(\s*["']Intenta de nuevo["']\s*\)\s*$/i,
        hint: "La cláusula 'else' simplemente se escribe 'else:' (sin condición repetida).",
        explanation: "¡Muy bien! 'else:' se ejecuta cuando la condición del 'if' no se cumple."
    },

    "door_3": {
        id: "door_3",
        category: "COMPARADORES",
        title: "🚪 Puerta 3: Comparar Igualdad",
        description: "Para comparar si dos cosas son iguales en un if se usa <code>==</code> (doble igual). Corrige el signo <code>=</code> por <code>==</code>:",
        type: "code_fix",
        initialCode: 'if clave = 1234:\n    print("Acceso correcto")',
        validationRegex: /^if\s+clave\s*==\s*1234\s*:\s*\n\s*print\s*\(\s*["']Acceso correcto["']\s*\)\s*$/i,
        hint: "Un solo '=' es para asignar variable; '==' es para comparar igualdad.",
        explanation: "¡Excelente! En Python usamos '==' para evaluar si dos valores son iguales."
    },

    // === NIVEL 4: Listas (Estructuras de Datos) ===
    "terminal_4_1": {
        id: "terminal_4_1",
        category: "SINTAXIS LISTAS",
        title: "📜 Corchetes de Lista",
        description: "Las listas en Python se definen entre corchetes <code>[ ]</code>. Cambia los paréntesis por corchetes:",
        type: "code_fix",
        initialCode: 'frutas = ("manzana", "banana", "pera")',
        validationRegex: /^frutas\s*=\s*\[\s*["']manzana["']\s*,\s*["']banana["']\s*,\s*["']pera["']\s*\]$/i,
        hint: "Usa corchetes de apertura '[' y de cierre ']' para crear una lista modificable.",
        explanation: "¡Genial! Las listas (arrays) en Python usan siempre corchetes [ ]."
    },

    "terminal_4_2": {
        id: "terminal_4_2",
        category: "MÉTODOS DE LISTA",
        title: "➕ Agregar elementos",
        description: "Para agregar un elemento a una lista usamos <code>.append()</code>. Corrige el método mal escrito:",
        type: "code_fix",
        initialCode: 'numeros.add_item(5)',
        validationRegex: /^numeros\.append\s*\(\s*5\s*\)$/i,
        hint: "El método nativo de listas en Python para añadir al final se llama 'append'.",
        explanation: "¡Correcto! lista.append(valor) agrega un elemento al final de la lista."
    },

    "door_4": {
        id: "door_4",
        category: "ÍNDICES DE LISTA",
        title: "🚪 Puerta 4: Primer Elemento",
        description: "En informática los índices empiezan en 0. Corrige el código para acceder al **primer elemento** de la lista:",
        type: "code_fix",
        initialCode: 'primer_color = colores[1]',
        validationRegex: /^primer_color\s*=\s*colores\s*\[\s*0\s*\]$/i,
        hint: "Cambia el índice [1] por [0] porque el conteo en listas arranca desde el cero.",
        explanation: "¡Brillante! El primer elemento de cualquier lista está en la posición [0]."
    },

    // === NIVEL 5: MINIBOSS 'BYTE GOLEM' (GUARDIÁN DE BITS) ===
    "byte_golem_1": {
        id: "byte_golem_1",
        category: "⚔️ ATAQUE 1 AL BYTE GOLEM",
        title: "💥 Sobrecarga: Eliminar Elemento con .pop()",
        description: "Para quitar el último elemento de una lista usamos <code>.pop()</code>. Úsalo para quitarle un escudo de bits al Golem:",
        type: "code_fix",
        initialCode: 'escudos.remove_last()',
        validationRegex: /^escudos\.pop\s*\(\s*\)$/i,
        hint: "Reemplaza '.remove_last()' por '.pop()'.",
        explanation: "¡Impacto certero! .pop() elimina y devuelve el último elemento de una lista."
    },

    "byte_golem_2": {
        id: "byte_golem_2",
        category: "⚔️ ATAQUE 2 AL BYTE GOLEM",
        title: "💥 Búsqueda en Memoria: Operador IN",
        description: "Para comprobar si un elemento existe dentro de una lista usamos <code>in</code>. Completa la condición:",
        type: "code_fix",
        initialCode: 'if "virus" = bugs:\n    destruir()',
        validationRegex: /^if\s+["']virus["']\s+in\s+bugs\s*:\s*\n\s*destruir\s*\(\s*\)$/i,
        hint: "Usa el operador 'in': if 'virus' in bugs:",
        explanation: "¡Excelente! Has perforado la defensa lógica del Byte Golem."
    },

    "byte_golem_3": {
        id: "byte_golem_3",
        category: "⚔️ GOLPE FINAL AL BYTE GOLEM",
        title: "💥 Sobrecarga de Tamaño: Longitud len()",
        description: "Para medir cuántos elementos tiene una lista en Python usamos <code>len(lista)</code>. Corrige la función:",
        type: "code_fix",
        initialCode: 'cantidad = count(items)',
        validationRegex: /^cantidad\s*=\s*len\s*\(\s*items\s*\)$/i,
        hint: "Reemplaza 'count(items)' por 'len(items)'.",
        explanation: "¡BYTE GOLEM DESTRUIDO! Has purificado la memoria del sistema."
    },

    // === NIVEL 6: Bucles y Funciones ===
    "terminal_5_1": {
        id: "terminal_5_1",
        category: "SINTAXIS BUCLE FOR",
        title: "🔁 Dos puntos en el FOR",
        description: "Al bucle <code>for</code> le faltan los dos puntos al final de la línea. ¡Agrégalos!",
        type: "code_fix",
        initialCode: 'for i in range(5)\n    print(i)',
        validationRegex: /^for\s+i\s+in\s+range\s*\(\s*5\s*\)\s*:\s*\n\s*print\s*\(\s*i\s*\)\s*$/i,
        hint: "Coloca ':' al final de 'for i in range(5)'.",
        explanation: "¡Perfecto! Los bucles for siempre terminan su encabezado con dos puntos ':'."
    },

    "terminal_5_2": {
        id: "terminal_5_2",
        category: "BUCLE WHILE",
        title: "⏳ Condición While",
        description: "¿Cuándo se detiene un bucle <code>while</code>?",
        type: "multiple_choice",
        options: [
            { id: "a", text: "Cuando su condición se vuelve False (Falsa).", correct: true },
            { id: "b", text: "Nunca, siempre se repite infinitamente." },
            { id: "c", text: "Al apretar la tecla escape en el teclado." }
        ],
        hint: "El while sigue repitiéndose mientras la condición sea True (Verdadera).",
        explanation: "¡Exacto! El bucle while frena en cuanto su condición ya no se cumple."
    },

    // === NIVEL 6: Funciones & Retorno de Valores (return) ===
    "terminal_6_1": {
        id: "terminal_6_1",
        category: "PALABRA CLAVE RETURN",
        title: "⚡ Devolver Valores con return",
        description: "Para que una función devuelva un resultado hacia quien la llamó, usamos <code>return</code>. Completa la función de suma:",
        type: "code_fix",
        initialCode: 'def sumar(a, b):\n    a + b',
        validationRegex: /^def\s+sumar\s*\(\s*a\s*,\s*b\s*\)\s*:\s*\n\s*return\s+a\s*\+\s*b$/i,
        hint: "Agrega 'return ' antes de 'a + b' dentro de la función.",
        explanation: "¡Excelente! return permite enviar el resultado de vuelta al programa."
    },

    "terminal_6_2": {
        id: "terminal_6_2",
        category: "LLAMAR A UNA FUNCIÓN",
        title: "📞 Invocación de Funciones",
        description: "Si definimos <code>def saltar():</code>, ¿cómo hacemos para ejecutarla en el código?",
        type: "multiple_choice",
        options: [
            { id: "a", text: "saltar()", correct: true },
            { id: "b", text: "call saltar" },
            { id: "c", text: "def saltar" }
        ],
        hint: "Para llamar a una función usamos su nombre seguido de paréntesis ().",
        explanation: "¡Correcto! Escribir saltar() ejecuta todas las instrucciones de la función."
    },

    "door_6": {
        id: "door_6",
        category: "PARÁMETROS",
        title: "🚪 Puerta 6: Parámetros",
        description: "Completa los paréntesis de la función para que reciba el parámetro <code>daño</code>:",
        type: "code_fix",
        initialCode: 'def atacar():\n    return daño * 2',
        validationRegex: /^def\s+atacar\s*\(\s*daño\s*\)\s*:\s*\n\s*return\s+daño\s*\*\s*2$/i,
        hint: "Escribe 'daño' dentro de los paréntesis: def atacar(daño):",
        explanation: "¡Muy bien! Los parámetros permiten pasarle datos a las funciones."
    },

    // === NIVEL 7: Métodos de Texto (Strings) & Operadores ===
    "terminal_7_1": {
        id: "terminal_7_1",
        category: "MÉTODOS DE TEXTO",
        title: "🔤 Convertir a Mayúsculas (.upper)",
        description: "En Python convertimos un texto a mayúsculas con <code>.upper()</code>. Agrega el método a la variable:",
        type: "code_fix",
        initialCode: 'grito = "cuidado"',
        validationRegex: /^grito\s*=\s*["']cuidado["']\.upper\s*\(\s*\)$/i,
        hint: 'Agrega .upper() al final del texto: "cuidado".upper()',
        explanation: "¡Genial! .upper() convierte cualquier texto a MAYÚSCULAS."
    },

    "terminal_7_2": {
        id: "terminal_7_2",
        category: "LONGITUD LEN()",
        title: "📏 Medir longitud con len()",
        description: "¿Qué devuelve la función <code>len(\"Python\")</code>?",
        type: "multiple_choice",
        options: [
            { id: "a", text: "6 (la cantidad de letras)", correct: true },
            { id: "b", text: "\"P\"" },
            { id: "c", text: "1" }
        ],
        hint: "P-y-t-h-o-n tiene 6 caracteres en total.",
        explanation: "¡Exacto! len() cuenta la cantidad de elementos o letras."
    },

    "door_7": {
        id: "door_7",
        category: "LÓGICA BOOLEANA",
        title: "🚪 Puerta 7: Operador AND",
        description: "La condición <code>(5 > 2) and (10 == 10)</code> devuelve:",
        type: "multiple_choice",
        options: [
            { id: "a", text: "True (ambas son verdaderas)", correct: true },
            { id: "b", text: "False" },
            { id: "c", text: "Error" }
        ],
        hint: "El operador 'and' solo da True si las dos partes son verdaderas.",
        explanation: "¡Correcto! Ambas expresiones son ciertas, por lo que el resultado es True."
    },

    // === NIVEL 8: PRIMER JEFE INTERMEDIO (GLITCH TITAN) ===
    "miniboss_1": {
        id: "miniboss_1",
        category: "⚔️ ATAQUE 1 AL GLITCH TITAN",
        title: "💥 Sobrecarga: Conversión a Entero int()",
        description: "El input devuelve texto. Usa <code>int()</code> para convertirlo a número y dañar el escudo del Glitch Titan:",
        type: "code_fix",
        initialCode: 'numero = input("5")',
        validationRegex: /^numero\s*=\s*int\s*\(\s*input\s*\(\s*["']5["']\s*\)\s*\)$/i,
        hint: 'Envuelve el input con int(): int(input("5"))',
        explanation: "¡Impacto directo! int() convierte texto a números enteros."
    },

    "miniboss_2": {
        id: "miniboss_2",
        category: "⚔️ ATAQUE 2 AL GLITCH TITAN",
        title: "💥 Desarmar Titan: Operador != (Distinto)",
        description: "En Python el operador para verificar si algo es <b>distinto</b> es <code>!=</code>. Corrige la condición:",
        type: "code_fix",
        initialCode: 'if bug == "vivo":\n    print("Destruir Titan")',
        validationRegex: /^if\s+bug\s*!=\s*["']vivo["']\s*:\s*\n\s*print\s*\(\s*["']Destruir Titan["']\s*\)$/i,
        hint: "Cambia '==' por '!=' para comprobar si bug es distinto de 'vivo'.",
        explanation: "¡Excelente! Has perforado la coraza del Glitch Titan."
    },

    "miniboss_3": {
        id: "miniboss_3",
        category: "⚔️ GOLPE FINAL AL GLITCH TITAN",
        title: "💥 Apagado Crítico: Condicional NOT",
        description: "El operador <code>not</code> invierte el valor booleano. Corrige el código para apagar el núcleo cuando no esté protegido:",
        type: "code_fix",
        initialCode: 'if protegido == False:\n    apagar()',
        validationRegex: /^if\s+not\s+protegido\s*:\s*\n\s*apagar\s*\(\s*\)$/i,
        hint: "Usa la sintaxis pitónica: 'if not protegido:'",
        explanation: "¡GLITCH TITAN DESTRUIDO! Has desactivado al Titán y despejado el camino al Jefe Final."
    },

    // === NIVEL 9: JEFE FINAL DEFINITIVO (ULTIMATEBUG OF DESTRUCTION) ===
    "boss_1": {
        id: "boss_1",
        category: "⚔️ ATAQUE 1 AL JEFE DEFINITIVO",
        title: "💥 Golpe Crítico: Indentación",
        description: "En Python los bloques de código dentro de una función o condicional deben tener <b>4 espacios de sangría (indentación)</b>. Agrega los espacios al print:",
        type: "code_fix",
        initialCode: 'if True:\nprint("Ataque")',
        validationRegex: /^if\s+True:\s*\n\s{2,8}print\s*\(\s*["']Ataque["']\s*\)$/i,
        hint: "Agrega espacios antes de la palabra 'print' para indentar la línea.",
        explanation: "¡Directo al núcleo del UltimateBug! La indentación es la estructura de Python."
    },

    "boss_2": {
        id: "boss_2",
        category: "⚔️ ATAQUE 2 AL JEFE DEFINITIVO",
        title: "💥 Golpe Crítico: Operador Módulo %",
        description: "El operador <code>%</code> devuelve el resto de una división. ¿Cuánto vale <code>10 % 2</code>?",
        type: "multiple_choice",
        options: [
            { id: "a", text: "0 (porque 10 es número par)", correct: true },
            { id: "b", text: "5" },
            { id: "c", text: "2" }
        ],
        hint: "10 dividido 2 da 5 exacto, no sobra nada (resto = 0).",
        explanation: "¡Impacto certero! El operador % es clave para saber si un número es par o impar."
    },

    "boss_3": {
        id: "boss_3",
        category: "⚔️ GOLPE FINAL AL JEFE DEFINITIVO",
        title: "⚡ Sobrecarga: Concatenar Texto",
        description: "En Python unimos (concatenamos) dos textos usando el operador <code>+</code>. Agrega el <code>+</code>:",
        type: "code_fix",
        initialCode: 'mensaje = "UltimateBug" "Destruido"',
        validationRegex: /^mensaje\s*=\s*["']UltimateBug["']\s*\+\s*["']Destruido["']$/i,
        hint: 'Coloca el signo más (+) entre los dos textos: "UltimateBug" + "Destruido"',
        explanation: "¡BOOOM! ¡Has aniquilado al UltimateBug of Destruction y salvado el código del sistema!"
    }
};

window.CHALLENGES = CHALLENGES_DATABASE;
