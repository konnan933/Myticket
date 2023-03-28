<?php

namespace App\Console\Commands;

use App\Models\Basket;
use App\Models\Currencies;
use Carbon\Carbon;
use DateTime;
use Illuminate\Console\Command;

class GetExchangeRate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'currencies:getExchangeRate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Getting the exchange rate of of today.';

    public function __construct()
    {
        parent::__construct();
    }
    public function getExchangeData()
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.apilayer.com/exchangerates_data/latest?symbols=EUR%2CUSD&base=HUF",
            CURLOPT_HTTPHEADER => array(
                "Content-Type: text/plain",
                "apikey: o4MhUfNLLj9xYn8mHkM4LuVnUlAARZhB"
            ),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET"
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return json_decode($response);
    }
    public function handle()
    {
        //$todaysExchangeData = GetExchangeRate::getExchangeData();

        $EUR = 0.002624;
        $USD = 0.002844;
        $currencies = Currencies::all();


        foreach ($currencies as $currency) {
            if ($currency->name == "USD" and $currency->changeTo == "HUF") {
                $currency->exchangeRate = $USD;
            }
            if ($currency->name == "EUR" and $currency->changeTo == "HUF") {
                $currency->exchangeRate = $EUR;
            }
            if ($currency->name == "EUR" and $currency->changeTo == "USD") {
                $currency->exchangeRate =   $EUR / $USD;
            }
            if ($currency->name == "USD" and $currency->changeTo == "EUR") {
                $currency->exchangeRate =  $USD  / $EUR;
            }
            if ($currency->name == "HUF" and $currency->changeTo == "EUR") {
                $currency->exchangeRate = 1 / $EUR;
            }
            if ($currency->name == "HUF" and $currency->changeTo == "USD") {
                $currency->exchangeRate =  1 / $USD;
            }
            $currency->save();
        }
    }
}
