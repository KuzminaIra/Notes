package com.KuzminaIra.notes.database.repository;

import com.KuzminaIra.notes.database.entity.Group;
import com.KuzminaIra.notes.database.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.*;

public interface NoteRepository extends JpaRepository<Note, Long> {
//    Note getNoteById(Long id);
//    List<Note> getAllByGroup(Group group);
    List<Note> findAllByGroupInAndNameLikeOrderByName(List<Group> groups, String name);
}
