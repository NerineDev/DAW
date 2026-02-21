#! /usr/bin/env python3
# codif.py: utf-8
# Cifrado César + modo "Crash Override" inspirado en Hackers (1995)
# Autor: Ana Vertedor (alias: Nerine Aoi)
# Fecha: 31/10/2025
# Descripción: 
#   Cifrado César + animación estilo *Hackers* (1995).
#   CrashOverride accede, AcidBurn contraataca en decod.py (todo simulado).
#   Cifra texto con una clave numérica y guarda los resultados en la carpeta "mision".

# -----------------------
# Imports y utilidades
# -----------------------
import sys
import time
import random
import argparse
import os
from datetime import datetime
import hashlib

# Colores para la consola
GREEN = "\033[92m"
CYAN  = "\033[96m"
RED   = "\033[91m"
YELLOW= "\033[93m"
MAG   = "\033[95m"
RESET = "\033[0m"
BOLD  = "\033[1m"

# Función para imprimir con efecto tecleo
def slow_print(s, delay=0.02, end="\n"):
    for ch in s:
        sys.stdout.write(ch)
        sys.stdout.flush()
        time.sleep(delay)
    sys.stdout.write(end)
    sys.stdout.flush()

# -----------------------
# Funciones de animación estilo "matrix"
# -----------------------
def random_line(width=60):
    chars = "01abcdef!@#$%^&*()-_=+[]{};:,.<>/?"
    return ''.join(random.choice(chars) for _ in range(width))

def matrix_burst(lines=12, width=70, speed=0.005, char_delay=0.0008):
    chars = "01abcdef!@#$%^&*()-_=+[]{};:,.<>/?"
    for _ in range(lines):
        line = ''.join(random.choice(chars) for _ in range(width))
        # imprimimos la línea lentamente, carácter a carácter
        for ch in line:
            sys.stdout.write(GREEN + ch + RESET)
            sys.stdout.flush()
            time.sleep(char_delay)
        sys.stdout.write("\n")
        sys.stdout.flush()
        time.sleep(speed)
    
# -----------------------
# Funciones de cifrado
# -----------------------
def cifrar(texto: str, clave: int) -> str:
    resultado = []
    for ch in texto:
        if 'a' <= ch <= 'z':  
            base = ord('a')
            resultado.append(chr((ord(ch) - base + clave) % 26 + base))
        elif 'A' <= ch <= 'Z':
            base = ord('A')
            resultado.append(chr((ord(ch) - base + clave) % 26 + base))
        else:
            resultado.append(ch)  
    return ''.join(resultado)

def descifrar(texto: str, clave: int) -> str:
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

# -----------------------
# Guardar resultados
# -----------------------
def guardar_mision(texto, cifrado, clave):
    import os, hashlib
    from datetime import datetime

    os.makedirs("mision", exist_ok=True)

    # Guardar texto original y cifrado
    with open("mision/input.txt", "w", encoding="utf-8") as f:
        f.write(texto)
    with open("mision/output.txt", "w", encoding="utf-8") as f:
        f.write(cifrado)

    # Crear hash del texto original (primeros 16 caracteres)
    h = hashlib.sha256(texto.encode()).hexdigest()[:16]

    # Guardar log con fecha, clave y hash
    with open("mision/log.txt", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] Clave={clave} | Hash={h}\n")

    print("Archivos guardados en carpeta 'mision/'")

# -----------------------
# Ejemplo de uso
# -----------------------
# texto = "Mess with the best, die like the rest."
# clave = 707
# El uso de 707 como clave - es una broma privada XD
# Sé que equivale a 5, pero 707 suena mejor :)
# cifrado = cifrar(texto, clave)
# guardar_mision(texto, cifrado, clave)
# -----------------------

# -----------------------
# Modo "CrashOverride" con animaciones  
# -----------------------
def crash():
    os.system('cls' if os.name == 'nt' else 'clear')
    print(CYAN + BOLD + "=== CRASH OVERRIDE - INITIATING OVERDRIVE ===" + RESET)
    time.sleep(0.5)

def anim_hack():
    slow_print("Connecting to 0xDEADBEEF... ", 0.03, "")
    time.sleep(0.4); slow_print("OK", 0.06)
    slow_print("Injecting payload: [███████░░░] 65%", 0.01)
    time.sleep(0.3)
    matrix_burst(lines=8, width=80, speed=0.01)
    slow_print("Bypassing firewall... ", 0.03, "")
    time.sleep(0.4); slow_print("OK", 0.06)
    slow_print("Crack assembled.", 0.03)
    time.sleep(0.35)
    for i in range(3, 0, -1):
        slow_print(f"OVERDRIVE in {i}...", 0.2)
    for _ in range(3):
        print(YELLOW + ">>> PACKET STORM " + str(random.randint(1000,9999)) + RESET)
        time.sleep(0.1)
    matrix_burst(lines=8, width=90, speed=0.007)
    slow_print(RED + BOLD + "\n*** SYSTEM CRASH ***" + RESET)
    time.sleep(0.4)
    slow_print(GREEN + BOLD + "\nACCESS GRANTED — CrashOverride\n" + RESET, 0.06)

# === Rezando en binario para que funcione ===
def main():
    import argparse
    parser = argparse.ArgumentParser(description="codif - Caesar cipher demo (Crash/AcidBurn)")
    parser.add_argument("--mode", choices=["crash", "normal"], default="crash")
    parser.add_argument("-m", "--mensaje")
    parser.add_argument("-k", "--clave", type=int)
    args = parser.parse_args()

    if args.mode == "crash":
        crash()
        anim_hack()
        return

    if args.mensaje is None or args.clave is None:
        print('Usage: python codif.py --mode normal -m "text" -k 707')
        return
    out = cifrar(args.mensaje, args.clave)
    print(out)
    guardar_mision(args.mensaje, out, args.clave)

if __name__ == "__main__":
    main()
