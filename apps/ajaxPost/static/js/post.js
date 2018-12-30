$(document).ready(()=>{
    console.log("REFRESHED")
    getQuotes()
    $('input[name=message]').keyup(()=>{
        

        $('#display').html(
            $('input[name=message]').val()
        )
    })
    $('#postForm').submit(()=>{
        postQuote()
        
        // $('#posts').append(
        //     "<div class = 'quote'> "+
        //     $('input[name=message]').val()+
        //     "</div> "
        //     )
        
        

        return false
    })
    function getQuotes(){
        $.ajax({
            url:'post/getQuotes',
            method:'GET',
            data:'',
        })
        .done((res)=>{
            for(quote in res.quotes)
            $('#posts').append(
                "<div class = 'quote'>"+
                res.quotes[quote].text+
                "</div>"
                )
        })
    }
    function postQuote(){
        $.ajax({
            url:'post/newQuote',
            method:'POST',
            data:$('#postForm').serialize(),
            
        })
        .done((res)=>{
            $('#posts').append(
                "<div class = 'quote'>"+
                $('input[name=message]').val()+
                "</div>"
            )
        })
    }

    function searchApi(){
        var pokeString = $('input[name = message]').val()
        $.ajax({
            url:'/pokemon/',
            method:"GET",
            data:$('#postForm').serialize(),
            
        })
        .done( (res)=>{
            $('#display').html(res)
        })
    }


})
