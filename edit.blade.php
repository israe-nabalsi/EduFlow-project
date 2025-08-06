<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  {{-- resources/views/dashboard/edit.blade.php --}}
  @extends('layouts.app') {{-- adapte si tu utilises un layout différent --}}

  @section('content')
  <div class="container" style="max-width: 600px;">

    <h2 class="mb-4">Modifier l’utilisateur #{{ $user->id }}</h2>

    {{-- Affiche les erreurs de validation --}}
    @if ($errors->any())
    <div class="alert alert-danger">
      <ul class="mb-0">
        @foreach ($errors->all() as $error)
        <li>{{ $error }}</li>
        @endforeach
      </ul>
    </div>
    @endif

    <form action="{{ route('admin.users.update', $user) }}" method="POST">
      @csrf
      @method('PUT')

      {{-- Nom --}}
      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $user->name) }}" required>
      </div>

      {{-- Email --}}
      <div class="mb-3">
        <label for="email" class="form-label">E‑mail</label>
        <input type="email" id="email" name="email" class="form-control" value="{{ old('email', $user->email) }}" required>
      </div>

      {{-- Promotion (user ➞ admin) --}}
      @if($user->role === 'user')
      <div class="mb-3 form-check">
        <input type="checkbox" id="role" name="role" value="admin" class="form-check-input" {{ old('role') === 'admin' ? 'checked' : '' }}>
        <label for="role" class="form-check-label"> Promouvoir en administrateur </label>
      </div>
      @else
      {{-- Si déjà admin, on l’affiche juste en lecture seule --}}
      <div class="mb-3">
        <label class="form-label">Rôle</label>
        <input type="text" class="form-control" value="admin" disabled>
      </div>
      @endif

      <button type="submit" class="btn btn-primary"> Enregistrer </button>

      <a href="{{ url()->previous() }}" class="btn btn-secondary ms-2">Annuler</a>
    </form>

  </div>
  @endsection

</body>

</html>