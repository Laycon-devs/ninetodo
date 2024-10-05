<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Ninetodo</title>

    <!-- Fonts -->
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="css/todo.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <style>
        body {
            font-family: 'Nunito', sans-serif;
        }
    </style>
</head>

<body class="">
    <section class="vh-100" style="background-color: #6211cb;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-10">

                    <div class="card" style="border-radius: 15px;">
                        <div class="card-body p-5">

                            <h6 class="mb-3 fw-bold">Awesome Todo List</h6>

                            <form class="d-flex justify-content-center align-items-center mb-4" id="todoForm">
                                <div data-mdb-input-init class="form-outline flex-fill">
                                    <input type="text" id="todoInput" class="form-control form-control-lg" />
                                    <label class="form-label text-success" for="form3">What do you need to do today?</label>
                                </div>
                                <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg ms-2">Add</button>
                            </form>

                            <ul class="list-group mb-0 show-todos">
                                <!-- Showing todos here -->
                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="js/todo.js"></script>
</body>

</html>