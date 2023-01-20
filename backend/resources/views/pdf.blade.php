<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>How to Generate QR Code in Laravel 9</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>

<body>
    <div class="container mt-4">
        <h2>{{$fel_nev}}</h2>
        <div class="card">
            <div class="card-header">
                <h2>Jegy azonosítód</h2>
            </div>
            <div class="card-body">
                <img src="data:image/png;base64, {!! base64_encode(QrCode::format('png')->size(300)->generate($qrcode)) !!} ">
            </div>
        </div>

    </div>
</body>

</html>