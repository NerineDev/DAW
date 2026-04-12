const {
    normalizarTelefono,
    esUsuarioValido,
    esPalabraPersonaValida,
    esNombreCompletoValido,
    esCorreoValido,
    esTelefonoValido,
    esTelefonoPorCodigo,
    esContrasenaValida,
    esFechaMayorDeEdad,
    sonValoresIguales
} = require('./validadores');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function formatearFecha(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
}

describe('Utilidades', () => {
    test('normaliza teléfono eliminando espacios y guiones', () => {
        expect(normalizarTelefono('600-123 456')).toBe('600123456');
    });
});

describe('Compatibilidad de exportación del módulo', () => {
    test('expone validadores en globalThis cuando no existe module.exports', () => {
        const codigo = fs.readFileSync(path.join(__dirname, 'validadores.js'), 'utf8');
        const sandbox = { window: {}, globalThis: {} };

        vm.createContext(sandbox);
        vm.runInContext(codigo, sandbox);

        expect(sandbox.globalThis.validadores).toBeDefined();
        expect(typeof sandbox.globalThis.validadores.esCorreoValido).toBe('function');
    });

    test('expone validadores en globalThis cuando no existe window', () => {
        const codigo = fs.readFileSync(path.join(__dirname, 'validadores.js'), 'utf8');
        const sandbox = { globalThis: {} };

        vm.createContext(sandbox);
        vm.runInContext(codigo, sandbox);

        expect(sandbox.globalThis.validadores).toBeDefined();
        expect(typeof sandbox.globalThis.validadores.esUsuarioValido).toBe('function');
    });
});

describe('Validación de usuario', () => {
    test('acepta usuario válido', () => {
        expect(esUsuarioValido('ana_user.1')).toBe(true);
    });

    test('acepta usuario válido con espacios laterales (trim)', () => {
        expect(esUsuarioValido('  ana_user  ')).toBe(true);
    });

    test('rechaza usuario corto', () => {
        expect(esUsuarioValido('ana')).toBe(false);
    });

    test('rechaza usuario con espacios', () => {
        expect(esUsuarioValido('ana user')).toBe(false);
    });

    test('rechaza usuario con caracteres no permitidos', () => {
        expect(esUsuarioValido('ana-user')).toBe(false);
    });
});

describe('Validación de nombre y apellido', () => {
    test('acepta palabra con inicial mayúscula', () => {
        expect(esPalabraPersonaValida('Ana')).toBe(true);
    });

    test('acepta palabra con tildes y ñ', () => {
        expect(esPalabraPersonaValida('Ñora')).toBe(true);
    });

    test('acepta nombre compuesto con ambas iniciales en mayúscula', () => {
        expect(esPalabraPersonaValida('María José')).toBe(true);
    });

    test('rechaza palabra en minúsculas', () => {
        expect(esPalabraPersonaValida('ana')).toBe(false);
    });

    test('rechaza palabra con guion', () => {
        expect(esPalabraPersonaValida('Ana-María')).toBe(false);
    });
});

describe('Validación de nombre completo', () => {
    test('acepta nombre y apellido válidos', () => {
        expect(esNombreCompletoValido('Ana Vertedor')).toBe(true);
    });

    test('acepta nombre completo con espacios laterales', () => {
        expect(esNombreCompletoValido('  Ana Vertedor  ')).toBe(true);
    });

    test('rechaza un solo nombre', () => {
        expect(esNombreCompletoValido('Ana')).toBe(false);
    });

    test('rechaza números en el nombre', () => {
        expect(esNombreCompletoValido('Ana 123')).toBe(false);
    });

    test('rechaza separadores no alfabéticos', () => {
        expect(esNombreCompletoValido('Ana Vertedor-López')).toBe(false);
    });
});

describe('Validación de correo electrónico', () => {
    test('acepta un correo válido', () => {
        expect(esCorreoValido('ana@example.com')).toBe(true);
    });

    test('acepta correo válido con espacios laterales', () => {
        expect(esCorreoValido('  ana@example.com  ')).toBe(true);
    });

    test('rechaza correo inválido', () => {
        expect(esCorreoValido('ana.example.com')).toBe(false);
    });

    test('rechaza correo sin dominio de nivel superior', () => {
        expect(esCorreoValido('ana@example')).toBe(false);
    });

    test('rechaza correo con espacios internos', () => {
        expect(esCorreoValido('ana @example.com')).toBe(false);
    });
});

describe('Validación de teléfono internacional', () => {
    test('rechaza teléfono cuando no se envía valor', () => {
        expect(esTelefonoValido()).toBe(false);
    });

    test('acepta el formato completo +34 600-123-456', () => {
        expect(esTelefonoValido('+34 600-123-456')).toBe(true);
    });

    test('acepta +34 sin espacio tras prefijo', () => {
        expect(esTelefonoValido('+34600123456')).toBe(true);
    });

    test('rechaza teléfono internacional con prefijo distinto en esTelefonoValido', () => {
        expect(esTelefonoValido('+33 600-123-456')).toBe(false);
    });

    test('con +34 acepta formato sin separadores internos', () => {
        expect(esTelefonoPorCodigo('+34', '600123456')).toBe(true);
    });

    test('con +34 acepta formato con espacios internos', () => {
        expect(esTelefonoPorCodigo('+34', '600 123 456')).toBe(true);
    });

    test('con +34 acepta móviles que empiezan por 7', () => {
        expect(esTelefonoPorCodigo('+34', '712-345-678')).toBe(true);
    });

    test('con +34 acepta fijos que empiezan por 9', () => {
        expect(esTelefonoPorCodigo('+34', '912345678')).toBe(true);
    });

    test('con +34 rechaza prefijos de numeración española no válidos', () => {
        expect(esTelefonoPorCodigo('+34', '512-345-678')).toBe(false);
    });

    test('con +34 rechaza longitud distinta de 9 dígitos', () => {
        expect(esTelefonoPorCodigo('+34', '60012345')).toBe(false);
    });

    test('para otros prefijos acepta 9 dígitos', () => {
        expect(esTelefonoPorCodigo('+44', '123456789')).toBe(true);
    });

    test('rechaza teléfono si no se selecciona código de país', () => {
        expect(esTelefonoPorCodigo('', '600123456')).toBe(false);
    });

    test('para otros prefijos acepta 10 dígitos', () => {
        expect(esTelefonoPorCodigo('+1', '123-456-7890')).toBe(true);
    });

    test('para otros prefijos rechaza menos de 9 dígitos', () => {
        expect(esTelefonoPorCodigo('+33', '12345678')).toBe(false);
    });

    test('para otros prefijos rechaza más de 10 dígitos', () => {
        expect(esTelefonoPorCodigo('+52', '12345678901')).toBe(false);
    });

    test('rechaza teléfono vacío', () => {
        expect(esTelefonoPorCodigo('+34', '')).toBe(false);
    });

    test('rechaza separadores no permitidos', () => {
        expect(esTelefonoPorCodigo('+34', '600.123.456')).toBe(false);
    });
});

describe('Validación de contraseña segura', () => {
    test('acepta contraseña con todos los requisitos', () => {
        expect(esContrasenaValida('Abcdef1!')).toBe(true);
    });

    test('acepta contraseña válida de 8 caracteres exactos', () => {
        expect(esContrasenaValida('Aa1!bcde')).toBe(true);
    });

    test('rechaza contraseña sin carácter especial', () => {
        expect(esContrasenaValida('Abcdef12')).toBe(false);
    });

    test('rechaza contraseña sin mayúscula', () => {
        expect(esContrasenaValida('abcdef1!')).toBe(false);
    });

    test('rechaza contraseña sin minúscula', () => {
        expect(esContrasenaValida('ABCDEF1!')).toBe(false);
    });

    test('rechaza contraseña sin número', () => {
        expect(esContrasenaValida('Abcdefg!')).toBe(false);
    });

    test('rechaza contraseña de menos de 8 caracteres', () => {
        expect(esContrasenaValida('Ab1!')).toBe(false);
    });
});

describe('Validación de mayoría de edad', () => {
    test('acepta fecha de nacimiento con 18 o más años', () => {
        expect(esFechaMayorDeEdad('2000-01-01')).toBe(true);
    });

    test('acepta exactamente 18 años cumplidos hoy', () => {
        const hoy = new Date();
        const fecha = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
        expect(esFechaMayorDeEdad(formatearFecha(fecha))).toBe(true);
    });

    test('rechaza fecha de nacimiento menor de edad', () => {
        expect(esFechaMayorDeEdad('2012-01-01')).toBe(false);
    });

    test('rechaza fecha vacía', () => {
        expect(esFechaMayorDeEdad('')).toBe(false);
    });

    test('rechaza fecha inválida', () => {
        expect(esFechaMayorDeEdad('fecha-no-valida')).toBe(false);
    });

    test('rechaza si cumple 18 mañana (aún menor)', () => {
        const hoy = new Date();
        const fecha = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
        fecha.setDate(fecha.getDate() + 1);
        expect(esFechaMayorDeEdad(formatearFecha(fecha))).toBe(false);
    });
});

describe('Validación de coincidencia entre campos', () => {
    test('acepta valores iguales', () => {
        expect(sonValoresIguales('test@example.com', 'test@example.com')).toBe(true);
    });

    test('acepta valores iguales con espacios laterales', () => {
        expect(sonValoresIguales('  test@example.com', 'test@example.com  ')).toBe(true);
    });

    test('rechaza valores diferentes', () => {
        expect(sonValoresIguales('test@example.com', 'otro@example.com')).toBe(false);
    });

    test('rechaza por diferencia de mayúsculas/minúsculas', () => {
        expect(sonValoresIguales('Test@example.com', 'test@example.com')).toBe(false);
    });
});
