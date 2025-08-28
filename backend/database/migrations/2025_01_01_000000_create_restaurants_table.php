<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('restaurants', function (Blueprint $table) {
            // we store original JSON ids as primary key so related orders match easily
            $table->unsignedBigInteger('id')->primary();
            $table->string('name');
            $table->string('location')->nullable();
            $table->string('cuisine')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('restaurants');
    }
};
