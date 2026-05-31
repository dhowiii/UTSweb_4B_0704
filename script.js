$(document).ready(function(){

    // AUTO CLOSE NAVBAR ON LINK CLICK
    $('.nav-link').on('click', function(){
        $('.navbar-collapse').collapse('hide');
    });

    // DARK MODE
    $('#themeBtn').click(function(){

        $('body').toggleClass('dark-mode');

        if($(this).text() === 'Dark Mode'){
            $(this).text('Light Mode');
        }else{
            $(this).text('Dark Mode');
        }

    });

    // BOOKING
    $('#btnBooking').click(function(){

        $('#notif')
        .removeClass('d-none')
        .hide()
        .fadeIn();

        setTimeout(function(){

            $('#notif').fadeOut(function(){
                $(this).addClass('d-none');
            });

        },3000);

    });

    // SEARCH SERVICE
    $('#search').on('keyup',function(){

        let value=$(this).val().toLowerCase();

        $('.service-card').filter(function(){

            $(this).toggle(
                $(this).text().toLowerCase().indexOf(value) > -1
            );

        });

    });

    // CONTACT FORM
    $('#contactForm').submit(function(e){

        e.preventDefault();

        let nama=$('#nama').val().trim();
        let email=$('#email').val().trim();

        if(nama==='' || email===''){
            alert('Nama dan Email wajib diisi');
            return;
        }

        // Get existing data from localStorage
        let dataArray = JSON.parse(localStorage.getItem('customerData')) || [];
        
        // Add new data
        dataArray.push({
            nama: nama,
            email: email
        });
        
        // Save to localStorage
        localStorage.setItem('customerData', JSON.stringify(dataArray));

        alert('Pesan berhasil dikirim!');
        
        // Refresh table
        loadDataTable();

        this.reset();

    });

    // LOAD DATA TABLE
    function loadDataTable(){
        let dataArray = JSON.parse(localStorage.getItem('customerData')) || [];
        let html = '';
        
        dataArray.forEach((item, index) => {
            html += `<tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>${item.email}</td>
            </tr>`;
        });
        
        $('#dataTable').html(html);
    }
    
    // Load data on page load
    loadDataTable();

    // SMOOTH NAVBAR ACTIVE
    $('.nav-link').click(function(){

        $('.nav-link').removeClass('active');

        $(this).addClass('active');

    });

});