<?php

namespace Database\Seeders;

use App\Models\Court;
use App\Models\Field;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FieldSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $field = Field::updateOrCreate(
            ['name' => 'Platinum Badminton Karya Timur'],
            [
                'description' => '12 Lapangan Badminton',
                'address' => 'Jl. Karya Timur No.C 88, Purwantoro, Kec. Blimbing, Kota Malang, Jawa Timur',
                'rules' => [
                    "Dilarang merokok di area dalam dan sekitar lapangan.",
                    "Dilarang meludah di lapangan maupun tribun.",
                    "Gunakan sepatu olahraga yang sesuai (non-marking) di dalam lapangan.",
                    "Dilarang membawa makanan berat ke dalam area lapangan.",
                    "Minuman hanya diperbolehkan dalam botol tertutup.",
                    "Buang sampah pada tempat yang telah disediakan.",
                    "Tidak diperkenankan membawa hewan peliharaan.",
                    "Dilarang melakukan tindakan kekerasan atau keributan.",
                    "Anak-anak di bawah 12 tahun harus dalam pengawasan orang dewasa.",
                    "Gunakan fasilitas dengan tertib dan bijak."
                ],
                'facilities' => [
                    "Cafe & Resto",
                    "Hot Shower",
                    "Jual Makanan Ringan",
                    "Jual Minuman",
                    "Musholla",
                    "Parkir Mobil",
                    "Parkir Motor",
                    "Ruang Ganti",
                    "Shower",
                    "Toilet",
                    "Toko Olahraga",
                    "Tribun Penonton"
                ],
                'image_path' => '1VSPVvAryutMw18ZZfUyv-Phb5X8cA2lf'
            ]
        );
        $court = $field->courts()->updateOrCreate(
            ['name' => 'Lapangan 1'],
            [
                'description' => 'Lapangan Badminton',
                'image_id' => '1lKKMAYFhoWCfz1Pq8jjjWrfGMsMkxQjf',
            ]

        );

        $court->schedules()->updateOrCreate(
            ['date' => now()->toDateString()],
            [
                'start_time' => '19:00',
                'end_time' => '20:00',
                'price' => 90000
            ]
        );
    }
}
