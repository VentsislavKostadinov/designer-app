<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="ScreenOrientation" content="autoRotate:disabled">
    <title>Designer</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
    <link rel="stylesheet" href="style/style.css">
</head>

<body onload="resizedDynamically()">


<header><img src="./img/1click-logo.png" alt="logo">
    <p id="orientation-portrait" style="margin: auto;"><img src="./img//rotate.gif" style="display: none; text-align: center;"></p>
    <h3 id="rotate-portrait-text" style="display: none;">Please rotate portrait</h3>
</header>

<div class="container text-center">
    <canvas id="myCanvas" width="380" height="253"></canvas>
</div>

<div class="container filters">

    <div class="btn-group btn-group-justified">
        <label for="imageLoader" class="image-load-button btn btn-dark mr-2">New image</label>
        <input type="file" id="imageLoader" name="imageLoader" />
        <button class="btn btn-dark mr-2" id="change-orientation">Orientation</button>
        <button type="button" class="btn btn-dark mr-2" id="filters" data-toggle="modal"
                data-target="#exampleModal">Filters</button>
        <button type="button" class="btn btn-dark" id="resetBtn">Reset Filters</button>
    </div>
    <div class="btn-group btn-group-justified">
        <p class="mr-2" style="color: black">Edge Style:</p>
        <button type="button" class="btn btn-dark mr-2" id="image-wrap">Image Wrap</button>
        <button type="button" class="btn btn-dark" id="wrap-white">White</button>
    </div>


    <div class="container">
        <button type="button" class="btn btn-dark mr-2" id="new-size" data-toggle="modal"
                data-target="#exampleModal2">New Size</button>
        <span id="sized">Size:</span>
        <span id="priced">Price:</span>
    </div>

    <div class="btn-group btn-group-justified" style="padding-top: 8px;">
        <button type="button" class="btn btn-dark mr-2" id="zoomIn">Zoom in</button>
        <button type="button" class="btn btn-dark mr-2" id="zoomOut">Zoom out</button>
        <button type="button" class="btn btn-dark mr-2" id="resetZoom">Reset Zoom</button>
        <button type="button" class="btn btn-dark mr-2" id="save">Download</button>
        <button type="button" class="btn btn-danger" id="venk-add-to-cart" name="venk-add-to-cart">Add to cart</button>
    </div>
   <label for="load" class="image-json-data"><i class="fas fa-file-upload"> Upload JSON data</i></label>
    <input type="file" id="load">
</div>

<!-- Modal Range Input Filters -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel1">Image Filters</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <p class="col-lg-2 col-sm-4 col-6 range-wrap">
                        <label for="grayscale">Grayscale</label><br />
                        <input type="range" id="grayscale" min="" max="100" value="0" class="range">
                        <output class="bubble"></output>
                    </p>
                    <p class="col-lg-2 col-sm-4 col-6 range-wrap">
                        <label for="contrast">Contrast</label><br />
                        <input type="range" id="contrast" min="0" max="200" value="100" class="range">
                        <output class="bubble"></output>
                    </p>
                    <p class="col-lg-2 col-sm-4 col-6 range-wrap">
                        <label for="hue-rotate">Hue-Rotate</label><br />
                        <input type="range" id="hue-rotate" min="" max="100" value="0" class="range">
                        <output class="bubble"></output>
                    </p>
                    <p class="col-lg-2 col-sm-4 col-6 range-wrap">
                        <label for="sepia">Sepia</label><br />
                        <input type="range" id="sepia" min="" max="100" value="0" class="range">
                        <output class="bubble"></output>
                    </p>
                    <p class="col-lg-2 col-sm-4 col-6 range-wrap">
                        <label for="invert">Invert</label><br />
                        <input type="range" id="invert" min="" max="100" value="0" class="range">
                        <output class="bubble"></output>
                    </p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal New Size and Price -->
<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel2">Select a new size</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <label for="pa_size">Size</label>
                <select data-attribute-name="attribute_pa_size" id="pa_size" class="custom-select" style="width: 100%;">
                    <option>Choose an option</option>
                    <option data-price="£10.99" value="8x8">8" x 8"</option>      <!-- £10.99 -->
                    <option data-price="£14.99" value="10x10">10" x 10"</option>  <!-- £14.99 -->
                    <option data-price="£12.99" value="12x8">12" x 8"</option>    <!-- £12.99 -->
                    <option data-price="£18.99" value="12x12">12" x 12"</option>  <!-- £18.99 -->
                    <option data-price="£26.99" value="14x14">14" x 14"</option>  <!-- £26.99 -->
                    <option data-price="£26.99" value="16x12">16" x 12"</option>  <!-- £26.99 -->
                    <option data-price="£27.99" value="16x16">16" x 16"</option>  <!-- £27.99 -->
                    <option data-price="£27.99" value="20x16">20" x 16"</option>  <!-- £29.99 -->
                    <option data-price="£33.99" value="24x16">24" x 16"</option>  <!-- £33.99 -->
                    <option data-price="£40.99" value="36x24">36" x 24"</option>  <!-- £40.99 -->
                </select>
                <br/> <br/>
                <div id="result"></div>
            </div>
            <div class="modal-footer" style="margin: auto;">
                <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                <button id="selectedSizePriceBtn" class="btn btn-dark" disabled>Select a new size</button>
            </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="./js/app.js"></script>
<script type="text/javascript" src="./js/priceAndSize.js"></script>
</body>


 <?php

add_action('template redirect', 'add_to_cart_from_another_page');

 function add_to_cart_from_another_page() {

     if( isset($_REQUEST['venk-add-to-cart'])) {

         $design = json_decode( base64_decode( $_REQUEST[ 'venk-add-to-cart' ] ), true );

         $varID = $design[ 0 ][ 'variationID' ];
         $prodID = $design[ 0 ][ 'prodID' ];


         WC()->cart->add_to_cart( $varID, $prodID);

     }


 }
?>

</html>