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
        width: 100%;
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
        border-radius: 25px;
        z-index: 3;
        padding-left: 20px;
    }


    .ticket .bottom {
        background: #fff;
        border-bottom-right-radius: 25px;
        border-bottom-left-radius: 25px;
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
            <div>
                <img src="{{$eventPicture}}" alt=" Esemény képe" width="500" height="300">
            </div>
            <div class="bottom">
                <div class="column">
                    <div class="row">
                        <div class="col-md-4">
                            <h2><span>Esemény cime: </span>{{$esemeny->title}}</h2>
                            <h2><span>Helyszin: </span>{{$helyszin_cim}}</h2>
                        </div>
                        <div class="col-md-4">
                            <h2><span>Esemény kezdete: </span>{{$esemeny->startDate}}</h2>
                            <h2><span>Esemény vége: </span>{{$esemeny->endDate}}</h2>
                        </div>
                        <div class="col-md-4">
                            <h2><span>A Neved: </span>{{$userName}}</h2>
                            <h2><span>Jegy típusa: </span>{{$ticketTypes}}</h2>
                            <h2><span>Ár: </span>{{$jegy_ar}}</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <img
                            src="data:image/png;base64, {!! base64_encode(QrCode::format('png')->size(200)->generate($tempQrCode)) !!} ">
                    </div>
                </div>
                <br>
                <div>
                    <p>
                        A QR KÓDRÓL NE
                        KÉSZÍTS FÉNYKÉPET ÉS NE TÖLTSD FEL
                        KÖZÖSSÉGI OLDALAKRA!
                    </p>
                </div>
            </div>

        </div>
</body>

</html>