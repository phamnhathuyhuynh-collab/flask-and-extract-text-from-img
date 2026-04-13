let showText = document.getElementById("showText");

document.getElementById('imageUpload').addEventListener('change', function () {
    
    let file = this.files[0]; 
    let reader = new FileReader();

    reader.onload = function (event) {
        let base64String = event.target.result; 
        document.getElementById('preview').src = base64String; 
        document.getElementById('preview').style.display = 'block'; 

        let pureBase64 = base64String.split(',')[1];

        $.ajax({
            url: 'http://127.0.0.1:8000/getimage',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ 'value': pureBase64 }),
            success: function(response) {
                showText.innerText = response.text;
                console.log(response.text);
            },
            error: function(error) {
                console.log(error);
            }
        });
    };
    reader.readAsDataURL(file);
});