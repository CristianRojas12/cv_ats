let pestanaActual = 0;
const totalPestanas = 4;

// 1. SISTEMA DE NAVEGACIÓN
function cambiarPestana(index) {
    pestanaActual = index;
    document.querySelectorAll('.tab').forEach((t, i) => t.classList.toggle('active', i === index));
    document.querySelectorAll('.form-section').forEach((s, i) => s.style.display = (i === index) ? 'block' : 'none');

    document.getElementById('btn-anterior').style.visibility = (index === 0) ? 'hidden' : 'visible';
    const btnSiguiente = document.getElementById('btn-siguiente');

    if (index === totalPestanas - 1) {
        btnSiguiente.innerText = 'Finalizar';
    } else {
        btnSiguiente.innerText = 'Siguiente';
    }
}

function navegar(direccion) {
    let nuevaPestana = pestanaActual + direccion;
    if (nuevaPestana >= 0 && nuevaPestana < totalPestanas) {
        cambiarPestana(nuevaPestana);
    }
}

// 2. FOTO
function cargarFoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('foto-texto').style.display = 'none';
            const mini = document.getElementById('mini-foto');
            mini.src = e.target.result;
            mini.style.display = 'block';

            const fotoCV = document.getElementById('out-foto');
            fotoCV.src = e.target.result;
            fotoCV.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}

// 3. DINÁMICOS (Educación, Experiencia, Certificaciones)
function agregarEducacion() {
    const div = document.createElement('div');
    div.className = 'item-dinamico bloque-edu';
    div.innerHTML = `
        <div class="item-header">
            <span class="item-title titulo-numerado-edu">Educación #</span>
            <button class="btn-eliminar" onclick="eliminarBloque(this, 'edu')">🗑️</button>
        </div>
        <div class="input-row-2">
            <div class="input-group"><label>Institución</label><input type="text" class="i-edu-inst" placeholder="UADE" oninput="renderizarCV()"></div>
            <div class="input-group"><label>Título</label><input type="text" class="i-edu-tit" placeholder="Licenciatura en Sistemas de Información" oninput="renderizarCV()"></div>
        </div>
        <div class="input-row-3">
            <div class="input-group"><label>Ubicación</label><input type="text" class="i-edu-ubi" placeholder="Buenos Aires" oninput="renderizarCV()"></div>
            <div class="input-group"><label>Fecha Inicio</label><input type="text" class="i-edu-ini" placeholder="Mar 2025" oninput="renderizarCV()"></div>
            <div class="input-group"><label>Finalización</label><input type="text" class="i-edu-fin" placeholder="Dic 2030 (o esperado)" oninput="renderizarCV()"></div>
        </div>
        <div class="input-group">
            <label>Descripción/Logros</label>
            <textarea class="i-edu-desc" rows="3" placeholder="Materias relevantes: Algoritmos, Estadística, Ingenieria de Datos. Promedio: 8" oninput="renderizarCV()"></textarea>
        </div>
    `;
    document.getElementById('lista-educacion').appendChild(div);
    actualizarNumeracion('edu');
    renderizarCV();
}

function agregarExperiencia() {
    const div = document.createElement('div');
    div.className = 'item-dinamico bloque-exp';
    div.innerHTML = `
        <div class="item-header">
            <span class="item-title titulo-numerado-exp">Experiencia #</span>
            <button class="btn-eliminar" onclick="eliminarBloque(this, 'exp')">🗑️</button>
        </div>
        <div class="input-row-2">
            <div class="input-group"><label>Empresa/Organización</label><input type="text" class="i-exp-emp" placeholder="Cervecería y Maltería Quilmes" oninput="renderizarCV()"></div>
            <div class="input-group"><label>Cargo</label><input type="text" class="i-exp-cargo" placeholder="Data Engineer SSR" oninput="renderizarCV()"></div>
        </div>
        <div class="input-row-3">
            <div class="input-group"><label>Ubicación</label><input type="text" class="i-exp-ubi" placeholder="Buenos Aires" oninput="renderizarCV()"></div>
            <div class="input-group"><label>Fecha Inicio</label><input type="text" class="i-exp-ini" placeholder="Jun 2025" oninput="renderizarCV()"></div>
            <div class="input-group"><label>Finalización</label><input type="text" class="i-exp-fin" placeholder="Presente" oninput="renderizarCV()"></div>
        </div>
        <div class="input-group">
            <label>Responsabilidades y Logros</label>
            <textarea class="i-exp-desc" rows="4" placeholder="• Participación en proyectos nacionales e internacionales enfocados en optimizar el análisis de datos y la generación de insights estratégicos\n\n• Desarrollo de procesos ETL con Databricks  - Azure, integrando datos de SAP, etc" oninput="renderizarCV()"></textarea>
        </div>
    `;
    document.getElementById('lista-experiencia').appendChild(div);
    actualizarNumeracion('exp');
    renderizarCV();
}

function agregarCertificacion() {
    const div = document.createElement('div');
    div.className = 'cert-row';
    div.innerHTML = `
        <input type="text" class="i-cert-nombre" placeholder="Analisis de Datos con SQL y Power BI" oninput="renderizarCV()">
        <input type="text" class="i-cert-fecha" placeholder="enero 2023" oninput="renderizarCV()">
        <button class="btn-eliminar" onclick="this.parentElement.remove(); renderizarCV();">🗑️</button>
    `;
    document.getElementById('lista-certificaciones').appendChild(div);
    renderizarCV();
}

function eliminarBloque(boton, tipo) {
    boton.closest('.item-dinamico').remove();
    actualizarNumeracion(tipo);
    renderizarCV();
}

function actualizarNumeracion(tipo) {
    const titulos = document.querySelectorAll(`.titulo-numerado-${tipo}`);
    const nombre = tipo === 'edu' ? 'Educación' : 'Experiencia';
    titulos.forEach((el, index) => { el.innerText = `${nombre} # ${index + 1}`; });
}

// 4. RENDERIZADO DEL CV
function renderizarCV() {
    // Info Personal y Contacto
    document.getElementById('out-nombre').innerText = document.getElementById('in-nombre').value;
    document.getElementById('out-titulo').innerText = document.getElementById('in-titulo').value;

    let contactoArr = [
        document.getElementById('in-correo').value,
        document.getElementById('in-telefono').value,
        document.getElementById('in-ubicacion').value,
        document.getElementById('in-linkedin').value,
        document.getElementById('in-github').value,
        document.getElementById('in-gitlab').value
    ].filter(item => item.trim() !== "");
    document.getElementById('out-contacto').innerHTML = contactoArr.join(" &nbsp;|&nbsp; ");

    // Resumen Profesional
    const resumen = document.getElementById('in-resumen').value;
    document.getElementById('out-resumen').innerText = resumen;
    document.getElementById('sec-cv-resumen').style.display = resumen ? 'block' : 'none';

    // Educación
    let htmlEdu = '';
    document.querySelectorAll('.bloque-edu').forEach(item => {
        const inst = item.querySelector('.i-edu-inst').value;
        const tit = item.querySelector('.i-edu-tit').value;
        const ubi = item.querySelector('.i-edu-ubi').value;
        const ini = item.querySelector('.i-edu-ini').value;
        const fin = item.querySelector('.i-edu-fin').value;
        const desc = item.querySelector('.i-edu-desc').value.replace(/\n/g, '<br>');
        const fechas = (ini || fin) ? `${ini} ${fin ? '- '+fin : ''}` : '';

        if(tit || inst) {
            htmlEdu += `<div class="cv-item">
                <div class="cv-item-header"><span>${inst}</span><span>${fechas}</span></div>
                <div class="cv-item-sub"><span>${tit}</span><span>${ubi}</span></div>
                ${desc ? `<div class="cv-item-desc">${desc}</div>` : ''}
            </div>`;
        }
    });
    document.getElementById('out-educacion').innerHTML = htmlEdu;
    document.getElementById('sec-cv-edu').style.display = htmlEdu === '' ? 'none' : 'block';

    // Experiencia
    const sinExp = document.getElementById('check-sin-exp').checked;
    let htmlExp = '';
    if (!sinExp) {
        document.querySelectorAll('.bloque-exp').forEach(item => {
            const emp = item.querySelector('.i-exp-emp').value;
            const cargo = item.querySelector('.i-exp-cargo').value;
            const ubi = item.querySelector('.i-exp-ubi').value;
            const ini = item.querySelector('.i-exp-ini').value;
            const fin = item.querySelector('.i-exp-fin').value;
            const rawDesc = item.querySelector('.i-exp-desc').value;
            const fechas = (ini || fin) ? `${ini} ${fin ? '- '+fin : ''}` : '';

            let descHtml = '';
            if (rawDesc) {
                const lines = rawDesc.split('\n').filter(l => l.trim() !== "");
                if (lines.some(l => l.trim().startsWith('•') || l.trim().startsWith('-'))) {
                    descHtml = '<ul>' + lines.map(l => `<li>${l.trim().replace(/^[•-]\s*/, '')}</li>`).join('') + '</ul>';
                } else {
                    descHtml = rawDesc.replace(/\n/g, '<br>');
                }
            }

            if(cargo || emp) {
                htmlExp += `<div class="cv-item">
                    <div class="cv-item-header"><span>${cargo}</span><span>${fechas}</span></div>
                    <div class="cv-item-sub"><span>${emp}</span><span>${ubi}</span></div>
                    ${descHtml ? `<div class="cv-item-desc">${descHtml}</div>` : ''}
                </div>`;
            }
        });
    }
    document.getElementById('out-experiencia').innerHTML = htmlExp;
    document.getElementById('sec-cv-exp').style.display = (sinExp || htmlExp === '') ? 'none' : 'block';

    // Habilidades Agrupadas
    const tec = document.getElementById('in-hab-tec').value;
    const idi = document.getElementById('in-idiomas').value;
    const adic = document.getElementById('in-hab-adic').value;

    let htmlHab = '';
    if (tec) htmlHab += `<div class="cv-hab-linea"><strong>Habilidades Técnicas:</strong> ${tec}</div>`;
    if (idi) htmlHab += `<div class="cv-hab-linea"><strong>Idiomas:</strong> ${idi}</div>`;
    if (adic) htmlHab += `<div class="cv-hab-linea"><strong>Habilidades Adicionales:</strong> ${adic}</div>`;

    document.getElementById('out-habilidades').innerHTML = htmlHab;
    document.getElementById('sec-cv-hab').style.display = htmlHab === '' ? 'none' : 'block';

    // Recopilar Certificaciones
    let certsHtml = '';
    document.querySelectorAll('.cert-row').forEach(row => {
        const nom = row.querySelector('.i-cert-nombre').value;
        const fec = row.querySelector('.i-cert-fecha').value;
        if(nom) {
            certsHtml += `<div class="cv-cert-item"><span>• ${nom}</span><span>${fec}</span></div>`;
        }
    });

    document.getElementById('out-certificaciones').innerHTML = certsHtml;
    document.getElementById('sec-cv-cert').style.display = certsHtml === '' ? 'none' : 'block';
}

function descargarPDF() {
    const elemento = document.getElementById('cv-hoja');

    const opt = {
        margin: 0,
        filename: 'Mi_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 3,
            useCORS: true,
            letterRendering: true,
            scrollY: 0,
            scrollX: 0,
            windowWidth: elemento.clientWidth
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Usamos el worker para tener más control y evitar páginas en blanco
    const worker = html2pdf().set(opt).from(elemento).toContainer().toCanvas().toImg().toPdf();

    worker.save().catch(err => console.error("Error al generar PDF:", err));
}

// Inicialización
agregarEducacion();
agregarExperiencia();
agregarCertificacion();
cambiarPestana(0);
renderizarCV();