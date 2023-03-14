usernameEl = document.getElementById("username");
passwordEl = document.getElementById("password");
password2El = document.getElementById("password2");
emailEl = document.getElementById("email");
clearEl = document.getElementById("clear");
sendEl = document.getElementById("send");
closeEl = document.getElementById("close");
const popUpEl = document.querySelector(".popup");
const inputsEl = document.querySelectorAll("input");

const checkForm = (item) => {
	inputsEl.forEach((el) => {
		if (el.value === "") {
			showError(el, el.placeholder);
		}
	});
};

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector(".error-text");

	formBox.classList.add("error");
	errorMsg.textContent = msg;
};

const cleanError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove("error");
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} musi składać się z min. ${min} znaków.`
		);
	}
};

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(password2El, "Hasła nie są identyczne");
	}
};

const checkMail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(emailEl.value)) {
		cleanError(emailEl);
	} else {
		showError(emailEl, "email jest niepoprawny");
	}
};

const checkErrors = () => {
	let errorCount = 0;
	const allFormBoxes = document.querySelectorAll(".form-box");
	allFormBoxes.forEach((el) => {
		if (el.classList.contains("error")) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		popUpEl.classList.add("show-popup");
	}
};

clearEl.addEventListener("click", (e) => {
	e.preventDefault();

	inputsEl.forEach((el) => {
		el.value = "";
		cleanError(el);
	});
});

sendEl.addEventListener("click", (e) => {
	e.preventDefault();

	checkLength(usernameEl, 3);
	checkLength(passwordEl, 8);
	checkForm(inputsEl);
	checkPassword(passwordEl, password2El);
	checkMail(emailEl);

	allFormBoxes.forEach((el) => {});

	checkErrors();
});

closeEl.addEventListener("click", (e) => {
	popUpEl.classList.remove("show-popup");
	inputsEl.forEach((el) => {
		el.value = "";
		cleanError(el);
	});
});
