package edu.eci.arsw.blueprints.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class Blueprint {

    private String author;
    private List<Point> points;
    private String name;

    // Constructor que acepta un array de puntos
    public Blueprint(String author, String name, Point[] pnts) {
        this.author = author;
        this.name = name;
        this.points = new ArrayList<>(Arrays.asList(pnts)); // Convierte el array a una lista
    }

    // Constructor por defecto
    public Blueprint() {
        this.points = new ArrayList<>();
    }

    // Constructor para inicializar con autor y nombre
    public Blueprint(String author, String name) {
        this.author = author;
        this.name = name;
        this.points = new ArrayList<>();
    }

    // Métodos getter
    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
    }

    public List<Point> getPoints() {
        return points;
    }

    // Método para agregar un punto
    public void addPoint(Point p) {
        this.points.add(p);
    }

    // Método toString
    @Override
    public String toString() {
        return "Blueprint{" + "author=" + author + ", name=" + name + ", points=" + points + '}';
    }

    // Método equals
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        final Blueprint other = (Blueprint) obj;
        return Objects.equals(this.author, other.author) &&
                Objects.equals(this.name, other.name) &&
                Objects.equals(this.points, other.points);
    }

    // Método hashCode
    @Override
    public int hashCode() {
        return Objects.hash(author, name, points);
    }
}
