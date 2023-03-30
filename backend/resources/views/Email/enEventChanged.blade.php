<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="utf-8">
</head>

<body>

    <div>
        Dear {{ $userName }}!,
        <br>
        On {{ $event_name }}, the event details have changed.
        <br>
        New details from the event:
        <ul>
            <li>
                <p>
                    Location name: {{ $location_name }}
                </p>
            </li>
            <li>
                <p>
                    Location: {{ $location_address }}
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