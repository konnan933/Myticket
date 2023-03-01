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
        <h2>Kedves {{$userName}}</h2>
        <div class="card">
            <div class="card-header">
                <h3>Jegy azonosítód</h3>
                <h4>Köszönjük a vasárlásod itt a jegyed a fáljokban</h4>
            </div>
        </div>

    </div>
</body>

</html>