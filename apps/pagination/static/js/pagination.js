$(document).ready(() => {
    $('#pages').html("Go To Page : ")
    $('#name').keyup(() => getUsers())
    $('#startDate').keyup(() => getUsers())
    $('#endDate').keyup(() => getUsers())
    $('#items').click(() => getUsers())

    
    function getUsers() {
        $('#pages').html("Go To Page : ")
        var formData = {
            name: $('#name').val(),
            start: $('#startDate').val(),
            end: $('#endDate').val()
        }

        $.ajax({
            url: 'pagination/name',
            method: 'GET',
            data: formData,
        })
            .done((res) => {
                idx = 1
                response = {}
                table = []
                for (user in res.users) {
                    if (table.length < $('#items').val()) {
                        table.push(res.users[user])
                        response[idx] = table
                    }
                    else {
                        idx++
                        table = []
                        table.push(res.users[user])
                        response[idx] = table
                    }
                }
                for (var idx in Object.keys(response)) {
                    var i = Object.keys(response)[idx]
                    var tbodystring = ""
                    var users = response[1]
                    for(let user = 0; user < users.length; user++){
                        tbodystring += '<tr><th scope="row">'+users[user].id+'</th> <td>'+users[user].first_name+'</td><td>'+users[user].last_name+'</td><td>'+users[user].created_at+'</td><td>'+users[user].email+'</td></tr>'
                    }
                    for(let user = users.length; user<$('#items').val(); user ++){
                        tbodystring += '<tr><th scope="row"></th> <td></td><td></td><td></td><td></td></tr>'
                    }
                    $('tbody').html(tbodystring)
                    $('#pages').append(
                        
                        $('<button/>', {
                            text: i,
                            class: 'btn btn-primary page '+i,
                            click : (i)=>{
                                
                                tbodystring = ""
                                $('tbody').html(tbodystring)
                                users = response[i.target.innerHTML]
                                
                                for(let user = 0; user < users.length; user++){
                                    tbodystring += '<tr><th scope="row">'+users[user].id+'</th> <td>'+users[user].first_name+'</td><td>'+users[user].last_name+'</td><td>'+users[user].created_at+'</td><td>'+users[user].email+'</td></tr>'
                                }
                                for(let user = users.length; user<$('#items').val(); user ++){
                                    tbodystring += '<tr><th scope="row"></th> <td></td><td></td><td></td><td></td></tr>'
                                }
                                $('tbody').html(tbodystring)
                            }
                        })
                    )

                }
            })
    }




//console.log(users[user].first_name)


})
