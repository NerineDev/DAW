#!/usr/bin/env python3
# decod.py: utf-8
# Descifrador para codif.py (Cifrado César)
# Autor: Ana Vertedor (alias: Nerine Aoi)
# Fecha: 31/10/2025
# Descripción:
#   Script sencillo que invierte el Cifrado César usado en codif.py.
#   Lee un mensaje desde argumento, fichero o input y aplica la clave numérica
#   para devolver el texto original.
#
import argparse
import random
import sys
import time
from pathlib import Path

# Colores para la consola
GREEN = "\033[92m"
CYAN  = "\033[96m"
RED   = "\033[91m"
YELLOW= "\033[93m"
MAG   = "\033[95m"
RESET = "\033[0m"
BOLD  = "\033[1m"

def slow_print(s, delay=0.02, end="\n"):
    for ch in s:
        sys.stdout.write(ch); sys.stdout.flush()
        time.sleep(delay)
    sys.stdout.write(end); sys.stdout.flush()

#-----------------------
# Funciones de animación estilo "matrix"
#-----------------------
def random_line(width=60):
    chars = "01abcdef!@#$%^&*()-_=+[]{};:,.<>/?"
    return ''.join(random.choice(chars) for _ in range(width))

def matrix_burst(lines=12, width=70, speed=0.005, char_delay=0.0008):
    chars = "01abcdef!@#$%^&*()-_=+[]{};:,.<>/?"
    for _ in range(lines):
        line = ''.join(random.choice(chars) for _ in range(width))
        for ch in line:
            sys.stdout.write(GREEN + ch + RESET)
            sys.stdout.flush()
            time.sleep(char_delay)
        sys.stdout.write("\n")
        sys.stdout.flush()
        time.sleep(speed)


#-----------------------
# Función de descifrado César
# Si todo sale bien, esto debería descifrar la que ha liado CrashOverride
#-----------------------

def descifrar(texto: str, clave: int) -> str:
    clave = clave % 26
    resultado = []
    for ch in texto:
        if 'a' <= ch <= 'z':
            base = ord('a')
            resultado.append(chr((ord(ch) - base - clave) % 26 + base))
        elif 'A' <= ch <= 'Z':
            base = ord('A')
            resultado.append(chr((ord(ch) - base - clave) % 26 + base))
        else:
            resultado.append(ch)
    return ''.join(resultado)

def main():
    parser = argparse.ArgumentParser(description="decod - descifra mensajes")
    parser.add_argument("-m", "--mensaje", help="Texto cifrado")
    parser.add_argument("-f", "--file", help="Archivo de entrada cifrado")
    parser.add_argument("-k", "--clave", type=int, required=True, help="Clave numérica usada para el cifrado")
    parser.add_argument("--anim", action="store_true", help="Mostrar animación AcidBurn")  # nueva flag
    args = parser.parse_args()

    if args.file:
        try:
            texto_cif = Path(args.file).read_text(encoding='utf-8')
        except Exception as e:
            print("Error al leer el archivo:", e)
            sys.exit(1)
    elif args.mensaje:
        texto_cif = args.mensaje
    else:
        texto_cif = input("Mensaje a descifrar: ")

    if args.anim:
        burn_intro()
        anim_trace()

    texto_plano = descifrar(texto_cif, args.clave % 26)

    if args.anim:
        print(CYAN + BOLD + "\n[RECOVERED DATA]" + RESET)
        slow_print(f"Clave: {args.clave}", 0.015)
        slow_print(f"Original: {texto_plano}", 0.015)
        print(RED + BOLD + "\nAcidBurn: YOU GOT BURNED. Session terminated." + RESET)
    else:
        print("Texto descifrado:")
        print(texto_plano)

#-----------------------
# ANIMACIONES DE DESCIFRADO
#-----------------------

def burn_intro():
    # Encabezado AcidBurn
    print(CYAN + BOLD + "=== ACIDBURN — STRIKING BACK ===" + RESET)
    time.sleep(0.4)

def anim_trace():
    matrix_burst(lines=8, width=80, speed=0.012)
    slow_print(MAG + "Trace detected — locking target." + RESET, 0.02)
    time.sleep(0.3)
    slow_print("Target locked.", 0.03)
    for _ in range(4):
        slow_print(".", 0.25, "")
    print()
    time.sleep(0.2)
    slow_print("Neutralizing: [", 0.02, "")
    for i in range(0, 21):
        slow_print("█", 0.03, "")
    slow_print("] 100%", 0.02)
    time.sleep(0.25)

# === Rezando en binario para que funcione ===
if __name__ == "__main__":
    main()