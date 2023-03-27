<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="utf-8">
</head>

<body>

    <div>
        Dear {{ $userName }}!,
        <br>
        On {{ $esemeny_neve }}, the event details have changed.
        <br>
        New details from the event:
        <ul>
            <li>
                <p>
                    Location name: {{ $helyszin_neve }}
                </p>
            </li>
            <li>
                <p>
                    Location: {{ $helyszin_cim }}
                </p>
            </li>
            <li>
                <p>
                    Event start date: {{ $startDate }}
                </p>
            </li>
            <li>
                <p>
                    Event end date: {{ $endDate }}
                </p>
            </li>
        </ul>
        <br>
        Thank you for your understanding.
        <br>
        Thankfull the Myticket team.
    </div>

</body>

</html>