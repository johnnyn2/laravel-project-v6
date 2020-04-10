@extends('app')

@section('title', 'Services')

@section('content')
    <p>This is Services Page. Our services include:</p>
    <ul>
        @forelse ($services as $service)
            <li>{{$service}}</li>
        @empty
            <li>Sorry, we don't have any service now.</li>
        @endforelse
    </ul>
@endsection