
$('#pa_size').on('change', function() {

    let selectNewSizeBtn = document.getElementById('selectedSizePriceBtn');
    let newSize = document.getElementById('pa_size').value;


    let outputResult = document.getElementById('result');

    if(newSize === 'Choose an option') {
        selectNewSizeBtn.disabled = true;
        outputResult.style.display = 'none';

    } else {
        selectNewSizeBtn.disabled = false;
        outputResult.style.display = 'block'
    }

    let priceVariation;
    let option = $(this).find('option:selected');
    priceVariation = (option.data('price'));

    outputResult.innerHTML = priceVariation;

    /* Append the variation and price in the designer web page */

    let outputSizeVariation = document.getElementById('sized');
    outputSizeVariation.innerHTML = 'Size: ' + newSize;
    sessionStorage.setItem('newSize', newSize);
    console.log(newSize)

    let outputPriceVariation = document.getElementById('priced');
    outputPriceVariation.innerHTML = "Price: " + priceVariation;
    sessionStorage.setItem('priceVariation', priceVariation);
    console.log(priceVariation)

    $(selectNewSizeBtn).on('click', function() {
        $('#exampleModal2').modal('hide');
    })

})