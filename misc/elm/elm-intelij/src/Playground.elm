module Playground exposing (main)

import Html exposing (text)
import String exposing (fromFloat)


decide one two =
    if one > 10 then
        "Go fishing"

    else if two == 5 then
        "Get to work"

    else
        "Go to the bar"


take one two =
    one + two


divide x =
    x / 3


multiply x =
    x * 4


getDay day =
    case day of
        1 ->
            "Monday"

        2 ->
            "Tuesday"

        6 ->
            "Saturday"

        7 ->
            "Sunday"

        _ ->
            "Unknown day"


getHashtag day =
    case getDay day of
        "Saturday" ->
            "#BeerSaturday"

        "Sunday" ->
            "#HangoverSunday"

        _ ->
            "#PlaceHolder"


main =
    take 4 1
        |> divide
        |> multiply
        |> floor
        |> getHashtag
        |> text
