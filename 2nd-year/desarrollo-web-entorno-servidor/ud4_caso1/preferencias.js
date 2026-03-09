

const themeSelect = document.createElement('select');
themeSelect.id = 'themeSelect';
themeSelect.innerHTML = `
	<option value="dark">Oscuro</option>
	<option value="light">Claro</option>
`;

const langSelect = document.createElement('select');
langSelect.id = 'langSelect';
langSelect.innerHTML = `
	<option value="es">Español</option>
	<option value="en">English</option>
`;

const prefDiv = document.createElement('div');
prefDiv.style = 'margin: 18px 0; padding: 8px; background: rgba(0,0,0,0.08); border-radius: 8px;';
prefDiv.innerHTML = '<b>Preferencias:</b> ';
prefDiv.appendChild(themeSelect);
prefDiv.appendChild(langSelect);
document.body.prepend(prefDiv);

function savePrefs() {
	localStorage.setItem('theme', themeSelect.value);
	document.cookie = `theme=${themeSelect.value};path=/;max-age=31536000`;
	applyPrefs();
}

function applyPrefs() {
	const theme = localStorage.getItem('theme') || 'dark';
	const lang = localStorage.getItem('lang') || 'es';
	themeSelect.value = theme;
	langSelect.value = lang;
	document.documentElement.setAttribute('data-theme', theme);
}

themeSelect.addEventListener('change', savePrefs);
langSelect.addEventListener('change', savePrefs);

applyPrefs();
