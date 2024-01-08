

const cep = document.getElementById('cep');
const mensagemErro = document.getElementById('erro')
const logradouro = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');

async function buscaEndereco(cep) {
	mensagemErro.innerHTML = '';
	try {
		const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
		const consultaCepConvertida = await consultaCep.json();
		if (consultaCepConvertida.erro) {
			throw Error();
		}

		logradouro.value = consultaCepConvertida.logradouro;
		bairro.value = consultaCepConvertida.bairro;
		cidade.value = consultaCepConvertida.localidade;
		estado.value = consultaCepConvertida.uf;
		return consultaCepConvertida;
	} catch (erro) {
		normalize();
		mensagemErro.innerHTML = `<p style="margin-left: 1.25rem; color: red;"> CEP inválido, tente novamente!</p>`;
	}
}

const normalize = () => {
	logradouro.value = '';
	bairro.value = '';
	cidade.value = '';
	estado.value = '';
	mensagemErro.innerHTML = '';

	logradouro.disabled = false;
	bairro.disabled = false;
	cidade.disabled = false;
	estado.disabled = false;
};
const disableFields = () => {
	logradouro.disabled = true;
	bairro.disabled = true;
	cidade.disabled = true;
	estado.disabled = true;
};
cep.addEventListener('focusout', () => {
	if (cep.value != '') {
		buscaEndereco(cep.value);
		disableFields();
	} else {
		normalize();
	}
});
