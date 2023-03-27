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
        <h2>Dear {{$userName}}</h2>
        <div class="card">
            <div class="card-header">
                <h3>Your ticket identifer</h3>
                <h4>Thank you for your purschase, you can find your tickets in the attachment bellow</h4>
            </div>
        </div>

    </div>
</body>

</html>