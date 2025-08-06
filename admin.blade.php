<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($users as $u)
            <tr>
                <td>{{ $u->id }}</td>
                <td>{{ $u->name }}</td>
                <td>{{ $u->email }}</td>
                <td>{{ $u->role }}</td>
                <td>
                    @if(auth()->id() !== $u->id)

                    {{-- Bouton éditer --}}
                    <a href="{{ route('admin.users.edit', $u) }}" class="btn btn-sm btn-primary"> Éditer</a>

                    {{-- Bouton supprimer --}}
                    <form action="{{ route('admin.users.destroy', $u) }}"
                        method="POST" style="display:inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Supprimer cet utilisateur ?')"> Supprimer</button>
                    </form>

                    {{-- Bouton promouvoir (user ➞ admin) --}}
                    @if($u->role === 'user')
                    <form action="{{ route('admin.users.update', $u) }}"
                        method="POST" style="display:inline">
                        @csrf
                        @method('PUT')
                        <input type="hidden" name="name" value="{{ $u->name }}">
                        <input type="hidden" name="email" value="{{ $u->email }}">
                        <input type="hidden" name="role" value="admin">
                        <button type="submit"
                            class="btn btn-sm btn-success">
                            Promouvoir
                        </button>
                    </form>
                    @endif

                    @endif
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

</body>

</html>