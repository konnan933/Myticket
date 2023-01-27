<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="utf-8">
</head>

<body>

    <div>
        Szia {{ $fel_nev }}!,
        <br>
        A vásárolt jegyed eseményén ({{ $esemeny_neve }}) változás történt.
        <br>
        Új adatok az eseményről:
        <ul>
            <li>
                <p>
                    Helyszín neve: {{ $helyszin_neve }}
                </p>
            </li>
            <li>
                <p>
                    Helyszín cim: {{ $helyszin_cim }}
                </p>
            </li>
            <li>
                <p>
                    Esemény kezdete: {{ $kezd_datum }}
                </p>
            </li>
            <li>
                <p>
                    Esemény vége: {{ $veg_datum }}
                </p>
            </li>
        </ul>
        <br>
        Megértésedet köszönjük.
        <br>
        Üdvözlettel a MyTicket csapata!
    </div>

</body>

</html>