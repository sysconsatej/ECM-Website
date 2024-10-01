const form = document.getElementById("login-form");
const btn = document.getElementById("f-login");
let data = { email_id: '', password: '' };

form.addEventListener('change', (event) => {
    if (event.target.name === 'fname') {
        data.email_id = event.target.value;
    } else if (event.target.name === 'pname') {
        data.password = event.target.value;
    }
});

btn.addEventListener('click', async (event) => {
    const url = "http://94.136.187.170:4017/api/v1/login";
    try {
        const res = await axios.post(url, data);
        console.log(res);
        if (res.status === 200) {
        //   localStorage.setItem('email_id', data.email_id);
        //   localStorage.setItem('password', data.password);

       setTimeout(() => {
        Toastify({
            text: `${res.data.message}`,
            style: {
              background: "green",
              width: '200px',
              borderRadius: '10px',
            }

          }).showToast();
       } , 100)

            const url = "http://94.136.187.170:4001/customerPortal/quotation/list";
            // Redirect to another page
            window.location.href = `${url}`;
            // Reset the form fields
            form.reset();
        }
    } catch (error) {
        setTimeout(() => {
            Toastify({
                text: `${error?.response?.data?.message}`,
                style: {
                  background: "red",
                  width: '200px',
                  borderRadius: '10px',
                }
              }).showToast()
        } , 100);
    }
});
