<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="utf-8">
</head>

<body>

    <div>
        Szia {{ $userName }}!,
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
                    Helyszín title: {{ $helyszin_cim }}
                </p>
            </li>
            <li>
                <p>
                    Esemény kezdete: {{ $startDate }}
                </p>
            </li>
            <li>
                <p>
                    Esemény vége: {{ $endDate }}
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