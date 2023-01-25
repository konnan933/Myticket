<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href=" https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />

    <style>
    body,
    p,
    h1 {
        margin:
            0;
        padding: 0;
    }

    .container {
        background: #e0e2e8;
        position: relative;
        width: 100%;
        height: 100vh;
    }

    .container .ticket {
        position: absolute;
        top: 50%;
        left: 50%;
        transform:
            translate(-50%, -50%);
    }

    .ticket {
        display: block;
        height: 575px;
        width: 100%;
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
        border-radius: 25px;
        z-index: 3;
    }

    .ticket .top {
        height:
            220px;
        background: #ffcc05;
        border-top-right-radius: 25px;
        border-top-left-radius: 25px;
    }

    .ticket .top h1 {
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 2;
        text-align: center;
        position: absolute;
        top:
            30px;
        left: 50%;
        transform: translateX(-50%);
    }

    .ticket .bottom {
        height: 355px;
        background: #fff;
        border-bottom-right-radius: 25px;
        border-bottom-left-radius: 25px;
    }

    .top .big {
        position: absolute;
        top: 100px;
        font-size: 65px;
        font-weight: 700;
        line-height: 0.8;
    }

    .top .big .from {
        color: #ffcc05;
        text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
    }

    .top .big .to {
        position: absolute;
        left: 32px;
        font-size: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .top .big .to i {
        margin-top: 5px;
        margin-right:
            10px;
        font-size: 15px;
    }

    .top--side {
        position: absolute;
        right: 35px;
        top: 110px;
        text-align: right;
    }

    .top--side i {
        font-size: 25px;
        margin-bottom: 18px;
    }

    .top--side p {
        font-size: 10px;
        font-weight: 700;
    }

    .top--side p+p {
        margin-bottom: 8px;
    }

    .bottom p {
        display: flex;
        flex-direction: column;
        font-size: 13px;
        font-weight: 700;
    }

    .bottom p span {
        font-weight: 400;
        font-size: 11px;
        color: #6c6c6c;
    }

    .bottom .column {
        margin: 0 auto;
        width: 80%;
        padding: 2rem 0;
    }

    .bottom .row {
        display: flex;
        justify-content: space-between;
    }

    .bottom .row--right {
        text-align: right;
    }

    .bottom .row--center {
        text-align: center;
    }

    .bottom .row-2 {
        margin:
            30px 0 60px 0;
        position: relative;
    }
    </style>
</head>

<body>
    <div class="container">

        <div class="text-center">
            <p>MyTicket</p>
        </div>

        <div class="ticket">
            <div class="top">
                <img>
            </div>
            <div class="bottom">
                <div class="column">
                    <div class="row">
                        <div class="col-md-4">
                            <p><span>Esemény cime </span>{{$esemeny->cim}}</p>
                            <p><span>Helyszin </span>hely</p>
                        </div>
                        <div class="col-md-4">
                            <p><span>Nyitás</span>nyitas</p>
                            <p><span>Esemény kezdete </span>{{$esemeny->kezd_datum}}</p>
                            <p><span>Esemény vége </span>{{$esemeny->veg_datum}}</p>
                        </div>
                        <div class="col-md-4">
                            <p><span>A Neved </span>{{$fel_nev}}</p>
                            <p><span>Jegy tipus </span>{{$jegy_tipus}}</p>
                            <p><span>Ár</span>{{$jegy_tipus}}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <img
                            src="data:image/png;base64, {!! base64_encode(QrCode::format('png')->size(200)->generate($tempQrCode)) !!} ">
                    </div>
                </div>
                <div>
                    <p>
                        A JEGYEN SZEREPLŐ QR KÓDRÓL NE
                        KÉSZÍTS FÉNYKÉPET ÉS NE TÖLTSD FEL
                        KÖZÖSSÉGI OLDALAKRA!
                    </p>
                </div>
            </div>

        </div>
</body>

</html>