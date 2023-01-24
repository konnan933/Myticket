<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="utf-8">
</head>

<body>

    <div>
        Szia {{ $vevo_nev }}!,
        <br>
        A vásárolt jegyed eseményén ({{ $cim }} változás történt)
        <br>
        Új adatok az eseményről:
        <li>
            <ul>
                {{ $cim }}
            </ul>
            <ul>
                {{ $helyszin }}
            </ul>
            <ul>
                {{ $kezd_datum }}
            </ul>
            <ul>
                {{ $veg_datum }}
            </ul>
        </li>
        <br>
        Megértésedet köszönjük.
        <br>
        Üdvözlettel a MyTicket csapata!
    </div>

</body>

</html>